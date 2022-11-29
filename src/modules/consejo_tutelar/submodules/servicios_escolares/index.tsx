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
    text: 'Responsables de orientación/Coordinaión de unidad',
    value: 4,
  },
  {
    id: 4,
    text: 'Todos',
    value: 5,
  },
];

const ServiciosEscolaresIndex: React.FC<{ rows: Data }> = ({ rows }) => {
  const queryClient = new QueryClient();
  const rowsInProccess: EnProceso[] = rows.EnProceso;
  const rowsCompleted: Concluidos[] = rows.Concluidos;
  const [allIds, setAllIds] = React.useState([]);
  const [allStatus, setAllStatus] = React.useState([1, 2, 3, 5]);

  const selected = (id: number[]) => {
    const temporalAllIds = allIds;
    if (!temporalAllIds.includes(id[0]) && id.length > 0) {
      temporalAllIds.push(id[0]);
    }
    setAllIds(temporalAllIds);
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
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Box
                sx={{
                  margin: '5px',
                  height: '100%',
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  borderRight: '1px solid',
                  paddingRight: '10px',
                }}
              >
                <Box>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={sendSpecificNotification}
                  >
                    Notificar a seleccionados
                  </Button>
                </Box>
              </Box>
              <Box
                sx={{
                  margin: '5px',
                  display: 'flex',
                  alignItems: 'center',
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
        <Table
          key="ct-table-list-2"
          rows={rowsCompleted}
          actionColumn={false}
        />
      ),
    },
  ];

  return <EcosurTabs align="left" data={tabs} />;
};

type ServiciosProps = {
  year: number;
  charge: boolean;
};

const ServiciosEscolaresFetch: React.FC<ServiciosProps> = ({
  year,
  charge,
}) => {
  const queryClient = new QueryClient();
  const [chargeData, setChargeData] = React.useState<boolean>(charge);
  const [selectYear, setSelectYear] = React.useState<number>(year);
  const { data, error, isLoading } = useQuery('se-conformacion-ct', async () =>
    getALLConformacionesCT(selectYear)
  );
  const [dataCT, setDataCT] = React.useState<any>(
    data === undefined ? { EnProceso: [], Concluidos: [] } : data
  );
  const [errorCT, setErrorCT] = React.useState<any>(error);
  const [isLoadingCT, setIsLoadingCT] = React.useState<any>(isLoading);

  React.useEffect(() => {
    if (chargeData) {
      setChargeData(false);
      setIsLoadingCT(false);
      return;
    }
    setSelectYear(year);
    getALLConformaciones();
  }, [year]);

  const getALLConformaciones = async () => {
    setIsLoadingCT(true);
    try {
      setDataCT(
        await queryClient.fetchQuery(['token'], () =>
          getALLConformacionesCT(year)
        )
      );
      setIsLoadingCT(false);
    } catch (error) {
      setErrorCT(error);
      setIsLoadingCT(false);
    }
  };

  if (isLoadingCT) return <CircularProgress />;
  if (errorCT) return <Alert severity="error">No se pudo acceder</Alert>;

  return <ServiciosEscolaresIndex rows={dataCT} />;
};

const ServiciosEscolares = () => {
  const [selectYear, setSelectYear] = React.useState<number>(
    new Date().getFullYear()
  );
  const [years, setYears] = React.useState<number[]>([]);

  const setData = () => {
    console.log('!@#!@#!@');
    let newYears = selectYear;
    const yearsArray = [];
    while (!yearsArray.includes(2010)) {
      yearsArray.push(newYears--);
    }
    yearsArray.push(0);
    setYears(yearsArray);
  };

  React.useEffect(() => {
    setData();
  }, []);

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
      <Grid
        container
        direction="row"
        justifyContent="flex-end"
        style={{ padding: '0px 16px', position: 'relative', top: '60px' }}
      >
        <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="año-label">Año</InputLabel>
          <Select
            labelId="año-label"
            id="año-select"
            autoWidth
            label="Año"
            name="año-select"
            defaultValue={selectYear}
          >
            {years.map((year: any, idx: number) => {
              return (
                <MenuItem
                  key={`items-year-${idx}`}
                  value={year}
                  onClick={() => {
                    setSelectYear(year);
                  }}
                >
                  {year}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Grid>
      <ServiciosEscolaresFetch year={selectYear} charge={true} />
    </>
  );
};

export default ServiciosEscolares;
