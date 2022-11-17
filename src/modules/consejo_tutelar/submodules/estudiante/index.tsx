import React from 'react';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import { Grid } from '@mui/material';
import { userStateAtom } from '@modules/auth/recoil';
import { EcosurAuth } from '@modules/auth/definitions';
import { useMutation, useQueryClient } from 'react-query';
import { ConsejoTutelarQuerys } from '@modules/consejo_tutelar/queries';
import { useGetAlumnoCT, getGrado } from './queries';
import { PersonalAcademicoGql, AsesorExternoGql } from './types';
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
  externosItems: AsesorExterno[];
  internosItems: PersonalAcademico[];
};

const EstudiantePage: React.FC<ConsejoTutelar> = ({
  grado,
  matricula,
  externosItems,
  internosItems,
}) => {
  const [disabled, setDisabled] = React.useState<boolean>(true);
  const queryClient = useQueryClient();
  const router = useRouter();
  const { mutate, isLoading } = useMutation(
    async (ct: ConsejoTutelarData) =>
      await ConsejoTutelarQuerys.registrar(ct.integrantes, ct.files),
    {
      onSuccess: () => {
        Swal.fire({
          icon: 'success',
          title: 'El consejo tutelar',
          text: 'Se guardo exitosamente',
        });
        queryClient.invalidateQueries();
        // NOFIXME: Este es un cambio por que no puede recargar la consulta graphql en reac-query, lo unico que hace es recargar la paguina
        router.push('/consejo_tutelar/0')
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
          {isLoading && <CircularProgress />}
        </Grid>
      </Grid>
    </Grid>
  );
};

type ConformacionCTAlumno = {
  internos: PersonalAcademico[],
  externos: AsesorExterno[],
  grado: 'maestria' | 'doctorado'
}

const Estudiante = () => {
  const user: EcosurAuth = useRecoilValue(userStateAtom);
  const matricula: number = user.estudiante?.matricula ?? 0;
  const queryAlumnoCT = useGetAlumnoCT(matricula);
  const [loaded, setLoaded] = React.useState<boolean>(false);
  const [integrantes, setIntegrantes] = React.useState<ConformacionCTAlumno>({
    grado: 'maestria',
    externos: [],
    internos: []
  })

  React.useEffect(() => {
    function setCT() {
      if (!loaded && queryAlumnoCT.isSuccess) {
        if (queryAlumnoCT.data.length > 0) {
          const internos = queryAlumnoCT.data[0].AsesoresInternos.map(
            (interno: PersonalAcademicoGql) => ({
              id: interno.id,
              nombre: interno.dataPersona.nombre,
              apellidoMaterno: interno.dataPersona.ApellidoMaterno,
              apellidoPaterno: interno.dataPersona.ApellidoPaterno,
            })
          )
          const externos = queryAlumnoCT.data[0].AsesoresExternos.map(
            (externo: AsesorExternoGql) => ({
              id: externo.id,
              nombre: externo.dataPersona.nombre,
              apellidoMaterno: externo.dataPersona.ApellidoMaterno,
              apellidoPaterno: externo.dataPersona.ApellidoPaterno,
              email: externo.dataPersona.Email,
              institucion: externo.dataPersona.Institucion,
              grado: externo.dataPersona.Grado,
              idParticipacion: externo.idParticipacion,
              argumentacion: externo.datosExtra?.Argumentacion ?? '',
              fileName: externo.datosExtra?.UrlCV ?? '',
              codirectorInfo: {
                sNI: externo.codirectorInfo?.SNI,
                numPubArb: externo.codirectorInfo?.NumPubArb,
                numEstMaestria: externo.codirectorInfo?.NumEstMaestria,
                numEstDoc: externo.codirectorInfo?.NumEstDoc,
              },
            })
          );
          const grado = getGrado(user.estudiante?.clavePrograma ?? 1);
          setIntegrantes({grado: grado, internos: internos, externos: externos})
          setLoaded(true)
        }
      }
    }
    setCT();
  }, [queryAlumnoCT]);
  return (
    <>
      {queryAlumnoCT.isError && (
        <Alert severity="error">No se pudo cargar su consejo tutelar</Alert>
      )}
      {queryAlumnoCT.isLoading && (<CircularProgress />)}
      {loaded && (
        <EstudiantePage
          grado={integrantes.grado}
          matricula={matricula}
          internosItems={integrantes.internos}
          externosItems={integrantes.externos}
        />
      )}
    </>
  );
};
export default Estudiante;
