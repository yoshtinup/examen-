import React from 'react';

import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import { Grid, Typography } from '@mui/material';
import { userStateAtom } from '@modules/auth/recoil';
import { EcosurAuth } from '@modules/auth/definitions';
import { useMutation, useQueryClient } from 'react-query';
import { ConsejoTutelarQuerys } from '@modules/consejo_tutelar/queries';
import { useGetAlumnoCT, getGrado } from './queries';
import Swal from 'sweetalert2';
import { Alert, CircularProgress, Stack, Card, Button } from '@mui/material';
import InstruccionesEnlaces from './InstruccionesEnlaces';
import { Estatus } from './components';

import {
  PersonalAcademico,
  AsesorExterno,
  PersonalAcademicoItem,
  AsesorExternoItem,
  SetIntegrantesCTList,
} from '@modules/consejo_tutelar/types';
import {
  BtnAgregarIntegrante,
  IntegranteCTContentCard,
  ExternoContentCard,
} from './components';

import { ConformacionCT } from './validations';

type ConsejoTutelarData = {
  integrantes: SetIntegrantesCTList;
  files: File[];
};

type ConsejoTutelar = {
  grado: 'maestria' | 'doctorado';
  matricula: number;
  DirectorTesis: string;
  externosItems: AsesorExterno[];
  internosItems: PersonalAcademico[];
};

const EstudiantePage: React.FC<ConsejoTutelar> = ({
  grado,
  matricula,
  DirectorTesis,
  externosItems,
  internosItems,
}) => {
  const [disabled, setDisabled] = React.useState<boolean>(true);
  const queryClient = useQueryClient();
  const router = useRouter();
  const { mutate } = useMutation(
    async (ct: ConsejoTutelarData) =>
      await ConsejoTutelarQuerys.registrar(ct.integrantes, ct.files),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['ct-conformacion-alumno']);
        Swal.close()
        Swal.fire({
          icon: 'success',
          title: 'El consejo tutelar',
          text: 'Se guardo exitosamente',
        });
        // NOFIXME: Este es un cambio por que no puede recargar la consulta graphql en reac-query, lo unico que hace es recargar la paguina
        router.push('/consejo_tutelar/0');
        /* externosItems = [] */
        /* internosItems = [] */
      },
      onError: () => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo guardar su consejo tutelar, intentelo nuevamente, verfique la información registrada de sus integrantes',
        });
        setDisabled(false);
      },
    }
  );
  const [conformacionCT, setConformacionCT] = React.useState<ConformacionCT>(
    new ConformacionCT(grado)
  );
  const [disabledBtnExternos, setDisabledBtnExternos] =
    React.useState<boolean>(false);
  const [disabledBtnInternos, setDisabledBtnInternos] =
    React.useState<boolean>(false);

  React.useEffect(() => {
    const internosMap = internosItems.map(i => {
      const item = i as PersonalAcademicoItem;
      item.aprobadoPorComite = true;
      return item;
    });

    const externosMap = externosItems.map(e => {
      const item = e as AsesorExternoItem;
      item.aprobadoPorComite = true;
      return item;
    });
    const currentCT = new ConformacionCT(grado, internosMap, externosMap);
    setDisabledAll(currentCT, currentCT.integrantesEstanCompletos());
    setConformacionCT(currentCT);
  }, [setConformacionCT]);

  const [externosFiles, setExternosFiles] = React.useState<File[]>([]);

  const setDisabledAll = (ct: ConformacionCT, completo: boolean = false) => {
    const ctCompleto = ct.integrantesEstanCompletos();
    setDisabled(completo ? true : !ctCompleto);
    setDisabledBtnInternos(ctCompleto);
    setDisabledBtnExternos(ct.asesoresExternosEstanCompletos() || ctCompleto);
  };

  const handleDisabled = () => {
    setConformacionCT(
      new ConformacionCT(
        conformacionCT.programa,
        conformacionCT.internos,
        conformacionCT.externos
      )
    );
    setDisabledAll(conformacionCT);
  };

  const addInterno = (integrante: PersonalAcademico) =>
    conformacionCT.addInterno(integrante, handleDisabled);

  const addExterno = (integrante: AsesorExterno, file: File) => {
    const guardadoCorrecto = conformacionCT.addExterno(integrante);
    if (guardadoCorrecto) {
      setExternosFiles([...externosFiles, file]);
      handleDisabled();
    }
  };

  const handleRemoveItem = (index: number, tipo: 'interno' | 'externo') =>
    tipo === 'interno'
      ? conformacionCT.removeInterno(index, handleDisabled)
      : conformacionCT.removeExterno(index, handleDisabled);

  const handleClick = () => {
    const consejoTutelar: SetIntegrantesCTList = {
      externos: conformacionCT.externos
        .filter(externo => !externo.aprobadoPorComite)
        .map(externo => externo as AsesorExterno),
      internos: conformacionCT.internos
        .filter(interno => !interno.aprobadoPorComite)
        .map(interno => interno.id),
    };
    if (consejoTutelar.externos.length === 0) consejoTutelar.externos = null;
    mutate({ integrantes: consejoTutelar, files: externosFiles });
    setDisabled(true);
    Swal.fire({
      title: 'Cargando su consejo tutelar',
      html: 'Cargando al personal académico',// add html attribute if you want or remove
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading()
      },
    })
  };

  return (
    <Grid
      container
      direction="row"
      justifyContent="flex-start"
      alignItems="center"
      id="SectionLogin"
      style={{ padding: '15px 50px' }}
    >
      <Estatus matricula={matricula} />
      <InstruccionesEnlaces />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <h3>Lista de integrantes</h3>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <BtnAgregarIntegrante
            disabled={disabledBtnInternos}
            onSubmit={addInterno}
          />
          <BtnAgregarIntegrante
            disabled={disabledBtnExternos}
            externo
            onSubmit={addExterno}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography > <b>Director/a de Tesis: </b>{DirectorTesis}</Typography>
          <Stack spacing={1}>
            {conformacionCT.internos.map((interno, index) => (
              <Card key={`card-integrante-interno-${index}`}>
                <IntegranteCTContentCard
                  index={index}
                  disabled={interno.aprobadoPorComite}
                  idParticipacion={2}
                  onRemoveItem={handleRemoveItem}
                  tipo="interno"
                  {...interno}
                />
              </Card>
            ))}
            {conformacionCT.externos.map((externo, index) => (
              <Card key={`card-integrante-interno-${index}`}>
                <IntegranteCTContentCard
                  index={index}
                  disabled={externo.aprobadoPorComite}
                  onRemoveItem={handleRemoveItem}
                  tipo="externo"
                  {...externo}
                >
                  <ExternoContentCard {...externo} />
                </IntegranteCTContentCard>
              </Card>
            ))}
          </Stack>
          <Button
            sx={{ mt: 3 }}
            onClick={handleClick}
            disabled={disabled}
            variant="contained"
          >
            Guardar consejo tutelar
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

const Estudiante = () => {
  const user: EcosurAuth = useRecoilValue(userStateAtom);
  const matricula: number = user.estudiante?.matricula ?? 0;
  const grado = getGrado(user.estudiante?.clavePrograma ?? 1);
  const { data, error, isLoading } = useGetAlumnoCT(matricula);
  if (error) return <Alert severity="error">No se pudo cargar su consejo tutelar</Alert>
  if (isLoading) return <CircularProgress />
  return (
    <EstudiantePage
      grado={grado}
      matricula={matricula}
      DirectorTesis={user.estudiante?.nombreDirectorTesis ?? ''}
      internosItems={data.internos}
      externosItems={data.externos}
    />
  );
};
export default Estudiante;
