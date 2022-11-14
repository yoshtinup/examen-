import React from 'react';
import { useRecoilValue } from 'recoil';
import { userStateAtom } from '@modules/auth/recoil';
import { EcosurAuth } from '@modules/auth/definitions';
import { useMutation } from 'react-query';
import ConsejoTutelarQuerys from '@modules/consejo_tutelar/queries';
import { useGetAlumnoCT, getGrado } from './queries';
import { PersonalAcademicoGql, AsesorExternoGql } from './types';
import Swal from 'sweetalert2';
import {
  Alert,
  CircularProgress,
  Box,
  Stack,
  Container,
  Card,
  Button,
} from '@mui/material';
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
  externosItems: AsesorExterno[];
  internosItems: PersonalAcademico[];
};

const EstudiantePage: React.FC<ConsejoTutelar> = ({
  grado,
  externosItems,
  internosItems,
}) => {
  const [disabled, setDisabled] = React.useState<boolean>(true);
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
      },
      onError: () => {
        Swal.fire({
          icon: 'error',
          title: 'Error en el consejo tutelar',
          text: 'No se pudo guardar su consejo tutelar, intentelo nuevamente, o verfique a sus integrantes',
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
    console.log(consejoTutelar);
    mutate({ integrantes: consejoTutelar, files: externosFiles });
    setDisabled(true);
  };

  return (
    <Container maxWidth="sm">
      <Box
        display="column"
        alignItems="center"
        justifyContent="center"
        /* sx={{ width: '60vw' }} */
      >
        {/* FIXME: @iocampo agregar instrucciones */}
        <BtnAgregarIntegrante
          disabled={disabledBtnInternos}
          onSubmit={addInterno}
        />
        <BtnAgregarIntegrante
          disabled={disabledBtnExternos}
          externo
          onSubmit={addExterno}
        />
        <Stack spacing={1}>
          {conformacionCT.internos.map((interno, index) => (
            <Card sx={{ width: 600 }} key={`card-integrante-interno-${index}`}>
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
            <Card sx={{ width: 600 }} key={`card-integrante-interno-${index}`}>
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
          Guardar
        </Button>
      </Box>
    </Container>
  );
};

const Estudiante = () => {
  const user: EcosurAuth = useRecoilValue(userStateAtom);
  const { data, isError, isLoading, isSuccess } = useGetAlumnoCT(
    user.estudiante?.matricula
  );
  if (isError)
    return <Alert severity="error">No se pudo cargar su consejo tutelar</Alert>;
  if (isLoading) return <CircularProgress />;
  let integrantesInternos: PersonalAcademico[] = [];
  let integrantesExternos: AsesorExterno[] = [];
  let grado: 'maestria' | 'doctorado' = 'maestria';
  if (isSuccess) {
    integrantesInternos = data[0].AsesoresInternos.map(
      (interno: PersonalAcademicoGql) => ({
        id: interno.id,
        nombre: interno.dataPersona.nombre,
        apellidoMaterno: interno.dataPersona.ApellidoMaterno,
        apellidoPaterno: interno.dataPersona.ApellidoPaterno,
      })
    );
    integrantesExternos = data[0].AsesoresExternos.map(
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
    grado = getGrado(user.estudiante?.clavePrograma ?? 1);
  }
  return (
    <EstudiantePage
      grado={grado}
      internosItems={integrantesInternos}
      externosItems={integrantesExternos}
    />
  );
};
export default Estudiante;
