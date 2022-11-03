import { Table } from './components';
import { Alumno } from '@modules/consejo_tutelar/types';
import { EcosurTabs } from 'ecosur-ui';

const data: Alumno[] = [
  {
    idPersonalAcademico: 10,
    matricula: 202112021,
    nombre: 'La patita fue al mercado mas cercano',
    idOrientacion: 2,
    orientacion: 'Biotecnología Ambiental',
    idPrograma: 1,
    programa: 'Maestría en Ciencias en Recursos Naturales y Desarrollo Rural',
    generacion: '20-21',
    idUnidad: 3,
    idDirectorTesis: 101,
    evaluadoPorIntegrantesCT: true,
    evaluadoPorResponsableOrientacion: false,
    evaluadoPorCordinacionUnidad: false,
    evaluadoPorIntegranteCT: false,
    statusGeneral: 2,
    leyendaEstatusGeneral: 'Pendiente de registrar Consejo Tutelar',
  },
];

const Personal = () => {
  // FIXME: Filtrar data por evaluacion deacuerdo al rol
  const tabs = [
    {
      titulo: 'Pendientes',
      componente: (
        <Table key="ct-table-list-1" rows={data} actionColumn={true} />
      ),
    },
    {
      titulo: 'Evaluadas',
      componente: (
        <Table key="ct-table-list-2" rows={data} actionColumn={false} />
      ),
    },
  ];

  return (
    <EcosurTabs data={tabs} />
    /*    <Table key='ct-table-list-2' rows={data} actionColumn={false} /> */
  );
};

export default Personal;
