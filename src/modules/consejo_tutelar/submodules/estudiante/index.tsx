import React from 'react';
import { Box, Stack, Container, Card, Button } from '@mui/material';
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

const internosItems: PersonalAcademico[] = [
  {
    id: 333,
    nombre: 'Diego',
    apellidoPaterno: 'Cruz',
    apellidoMaterno: 'Aguilar',
  },
  {
    id: 334,
    nombre: 'Diego',
    apellidoPaterno: 'Cruz',
    apellidoMaterno: 'Aguilar',
  },
  /* { */
  /*   id: 335, */
  /*   nombre: 'Diego', */
  /*   apellidoPaterno: 'Cruz', */
  /*   apellidoMaterno: 'Aguilar', */
  /* }, */
];

const externosItems: AsesorExterno[] = [];

const Estudiante = () => {
  const [conformacionCT, setConformacionCT] = React.useState<ConformacionCT>(
    new ConformacionCT()
  );
  const [disabled, setDisabled] = React.useState<boolean>(true);
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
    const currentCT = new ConformacionCT('doctorado', internosMap, externosMap);
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
    console.log(consejoTutelar);
    console.log(externosFiles);
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
export default Estudiante;
