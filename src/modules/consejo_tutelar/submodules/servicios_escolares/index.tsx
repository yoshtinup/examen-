import React from 'react';
import { useQuery, QueryClient } from 'react-query';
import { Grid } from '@mui/material';
//import Table from '@modules/consejo_tutelar/submodules/servicios_escolares/components/Table';
import Table from './components/Table';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import CircularProgress from '@mui/material/CircularProgress';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { EcosurTabs } from 'ecosur-ui';
import InstruccionesEnlacesIndex from './components/InstruccionesEnlacesIndex';
import { getALLConformacionesCT, ServiciosEscolaresQuerys } from './queries';
import { Data, EnProceso, Concluidos } from './types';
import Swal from 'sweetalert2';

const item = [
  {
    id: 0,
    text: 'Estudiantes',
    value: 1,
  },
  {
    id: 1,
    text: 'Integrantes de CT',
    value: 2,
  },
  {
    id: 2,
    text: 'Directores de tesis',
    value: 3,
  },
  {
    id: 3,
    text: 'Responsables de orientación/Coordinación de unidad',
    value: 4,
  },
  {
    id: 4,
    text: 'Todos',
    value: 5,
  },
];

const ServiciosEscolaresIndex: React.FC<{
  rows: Data;
  updateCompleted: any;
  chargeGenerations?: any;
}> = ({ rows, updateCompleted, chargeGenerations }) => {
  const queryClient = new QueryClient();
  const rowsInProccess: EnProceso[] = rows.EnProceso;
  const rowsCompleted: Concluidos[] = rows.Concluidos;
  const [allIds, setAllIds] = React.useState([]);
  const [allStatus, setAllStatus] = React.useState([1, 2, 3, 5]);
  const [selectGeneration, setSelectGeneration] = React.useState<number>(
    new Date().getFullYear()
  ); // Esto va a cambiar
  const [generations, setGenerations] = React.useState<number[]>([
    selectGeneration,
  ]);
  //const [generations, setGenerations] = React.useState<number[]>(chargeGenerations);

  const selected = (id: number[]) => {
    const temporalAllIds = allIds;
    if (!temporalAllIds.includes(id[0]) && id.length > 0) {
      temporalAllIds.push(id[0]);
      setAllIds(temporalAllIds);
    } else {
      setAllIds(id);
    }
  };

  const sendGeneralNotification = async () => {
    if (rowsInProccess.length === 0) {
      return Swal.fire({
        icon: 'info',
        title: '',
        text: 'Debe existir al menos un dato en la tabla',
      });
    }
    try {
      Swal.fire({
        toast: true,
        position: 'bottom-end',
        showConfirmButton: false,
        icon: 'info',
        text: 'Se están enviado las notificaciones',
        timer: 10000,
        timerProgressBar: true,
      });
      const result = await queryClient.fetchQuery(
        ['ct-generalNotifications-send'],
        () =>
          ServiciosEscolaresQuerys.sendGeneral(
            allStatus.includes(5) ? [1, 2, 3, 5] : allStatus
          )
      );
      Swal.fire({
        toast: true,
        position: 'bottom-end',
        showConfirmButton: false,
        icon: 'success',
        text: result,
        timer: 2000,
        timerProgressBar: true,
      });
    } catch (err) {
      Swal.fire({
        toast: true,
        position: 'bottom-end',
        showConfirmButton: false,
        icon: 'error',
        text: 'Se ha producido un error',
        timer: 2000,
        timerProgressBar: true,
      });
    }
  };

  const sendSpecificNotification = async () => {
    if (allIds.length === 0) {
      return Swal.fire({
        icon: 'info',
        title: '',
        text: 'Debes seleccionar al menos un dato de la tabla',
      });
    }

    try {
      Swal.fire({
        toast: true,
        position: 'bottom-end',
        showConfirmButton: false,
        icon: 'info',
        text: 'Se están enviado las notificaciones',
        timer: 10000,
        timerProgressBar: true,
      });
      const result = await queryClient.fetchQuery(
        ['ct-generalNotifications-send'],
        () => ServiciosEscolaresQuerys.sendSpecific(allIds)
      );
      Swal.fire({
        toast: true,
        position: 'bottom-end',
        showConfirmButton: false,
        icon: 'success',
        text: result,
        timer: 2000,
        timerProgressBar: true,
      });
    } catch (err) {
      Swal.fire({
        toast: true,
        position: 'bottom-end',
        showConfirmButton: false,
        icon: 'error',
        text: 'Se ha producido un error',
        timer: 2000,
        timerProgressBar: true,
      });
    }
  };

  const tabs = [
    {
      titulo: 'En proceso',
      componente: (
        <>
          <Grid container direction="row" justifyContent="flex-end">
            <InputLabel
              style={{
                width: '100%',
                textAlign: 'end',
                padding: '20px 165px 0px 0px',
              }}
            >
              Enviar notificaciones a:
            </InputLabel>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Box
                sx={{
                  margin: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '10px',
                }}
              >
                <Box>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={sendSpecificNotification}
                  >
                    Seleccionados
                  </Button>
                </Box>
              </Box>
              <Box
                sx={{
                  margin: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '10px',
                  background: '#fff',
                  borderRadius: '10px',
                }}
              >
                <FormControl
                  sx={{ m: 1, minWidth: 150, maxWidth: 150, margin: '5px' }}
                >
                  <InputLabel id="notification-label">Notificación</InputLabel>
                  <Select
                    labelId="notification-label"
                    id="notification-select"
                    label="Notificación"
                    defaultValue={5}
                  >
                    {item.map(data => (
                      <MenuItem
                        key={`select-notification-${data.id}`}
                        value={data.value}
                        onClick={() => {
                          setAllStatus([data.value]);
                        }}
                      >
                        {data.text}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Box>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={sendGeneralNotification}
                  >
                    Enviar
                  </Button>
                </Box>
              </Box>
            </Box>
            <Box sx={{ width: '100%' }}>
              <Table
                key="ct-table-list-1"
                rows={rowsInProccess}
                actionColumn={true}
                list={selected}
              />
            </Box>
          </Grid>
        </>
      ),
    },
    {
      titulo: 'Concluidos',
      componente: (
        <>
          <Grid container direction="row" justifyContent="flex-end">
            <Grid container direction="row" justifyContent="flex-end">
              <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="generations-label">Generación</InputLabel>
                <Select
                  labelId="generations-label"
                  id="generations-select"
                  autoWidth
                  label="Generación"
                  name="generations-select"
                  defaultValue={selectGeneration}
                >
                  {generations.map((generation: any, idx: number) => {
                    return (
                      <MenuItem
                        key={`items-year-${idx}`}
                        value={generation}
                        onClick={() => {
                          setSelectGeneration(generation);
                          updateCompleted();
                        }}
                      >
                        {generation}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Box sx={{ width: '100%' }}>
              <Table
                key="ct-table-list-2"
                rows={rowsCompleted}
                actionColumn={false}
              />
            </Box>
          </Grid>
        </>
      ),
    },
  ];

  return <EcosurTabs align="left" data={tabs} />;
};

const ServiciosEscolaresFetch: React.FC<unknown> = () => {
  const queryClient = new QueryClient();
  const { data, error, isLoading } = useQuery('se-conformacion-ct', async () =>
    getALLConformacionesCT()
  );
  const [dataCT, setDataCT] = React.useState<Data>(data);
  const [errorCT, setErrorCT] = React.useState<unknown>(error);
  const [isLoadingCT, setIsLoadingCT] = React.useState<boolean>(isLoading);

  React.useEffect(() => {
    setDataCT(data === undefined ? { EnProceso: [], Concluidos: [] } : data);
  }, [data]);

  const getALLConformaciones = async () => {
    setIsLoadingCT(true);
    try {
      const result = await queryClient.fetchQuery(['se-conformacion-ct'], () =>
        getALLConformacionesCT()
      );
      //console.log(result);
      setDataCT({ EnProceso: dataCT.EnProceso, Concluidos: result.Concluidos });
      setIsLoadingCT(false);
    } catch (error) {
      setErrorCT(error);
      setIsLoadingCT(false);
    }
  };

  if (isLoading) return <CircularProgress />;
  if (error) return <Alert severity="error">No se pudo acceder</Alert>;

  return (
    <ServiciosEscolaresIndex
      rows={dataCT}
      updateCompleted={getALLConformaciones}
    />
  );
};

const ServiciosEscolares = () => {
  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        id="SectionLogin"
        style={{ padding: '15px 50px' }}
      >
        <InstruccionesEnlacesIndex />
      </Grid>
      <ServiciosEscolaresFetch />
    </>
  );
};

export default ServiciosEscolares;
