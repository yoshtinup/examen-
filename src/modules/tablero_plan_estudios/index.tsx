import GraficaCursos from './submodules/grafica';
import CardsCursos from './submodules/cards-cursos';
import { useGetCursosAlumno } from '@shared/queries';
import { CursoGql, CursosAlumnoGql, Estatus } from '@shared/types';
import CardsCuaSem from './submodules/cards-cuatrimestres-semestres';
import CardsCursosAIniciar from './submodules/cards-cursos-por-iniciar';
import { EcosurTabs } from 'ecosur-ui';
import {
  CSGql,
  SemestresCuatrimestresGql,
} from '@shared/types/cuatrimestresSemestresGql';
import { EcosurAuth } from '@modules/auth/definitions';
import { useRecoilValue } from 'recoil';
import { userStateAtom } from '@modules/auth/recoil';
import { CursoPorIniciarGql } from '@shared/types/cursosPorIniciarGql';
import { useGetCursosAIniciar } from '@shared/queries/cursosPorIniciarGql';
import ProductosActividadesRealizadas from './submodules/productos_actividades_realizadas';
import { Container } from '@mui/system';
import { Grid } from '@mui/material';
import { HeaderSection } from '@shared/components';
import EvaluacionBecario from './submodules/evaluacion-becario';
import EvaluacionEtica from './submodules/evaluacion-etica';
import { useEffect, useState } from 'react';
import { listaCursosState } from './recoil';

const style = {
  padding: '30px',
  backgroundColor:"#fff",
  marginTop:"30px"
}

const TableroPlanEstudios = () => {
  const user: EcosurAuth = useRecoilValue(userStateAtom);
  const listaCursos = useGetCursosAlumno(user.estudiante.matricula);
  //const [listaCursos, setListaCursos] = useRecoilValue(listaCursosState);
  const [arrayCursos, setArrayCursos] = useState<CursosAlumnoGql>();
  const [arrayCS, setArrayCS] = useState<SemestresCuatrimestresGql>();

  /***/
  useEffect(() => {
    setArrayCursos(getCursosEstudiante(listaCursos));
    setArrayCS(getCuatrimestresSemestres(listaCursos));
  });
  /***/

  const arrayCursosAIniciar: CursoPorIniciarGql[] = crearJSON().data.sort(
    (a, b) => {
      if (a.FechaInicioCurso > b.FechaInicioCurso) return 1;
      if (a.FechaInicioCurso < b.FechaInicioCurso) return -1;
      return 0;
    }
  ); //useGetCursosAIniciar(false).data;
  const tabCursos = [
    {
      titulo: 'Asignaturas',
      componente: <CardsCursos data={arrayCursos} aIniciar={arrayCursosAIniciar} />,
    },
    {
      titulo: 'Periodos lectivos',
      componente: <CardsCuaSem data={arrayCS} />,
    },
    {
      titulo: 'Alta de asignaturas',
      componente: <CardsCursosAIniciar data={arrayCursosAIniciar} />,
    },
  ];
  return (
    <>
      <Container maxWidth={false} style={{...style }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <HeaderSection label="PLAN DE ESTUDIOS" shadow={false} />
          </Grid>
          <Grid item xs={12}>
            <GraficaCursos data={arrayCursos} />
            <EcosurTabs
              data={tabCursos}
              align="left"
              activeColor="#ecf0f5"
              activeTextColor="black"
              key="ecosur-tabs-cursos"
            />
          </Grid>
        </Grid>
      </Container>
      <EvaluacionBecario />
      <EvaluacionEtica />
      <Container maxWidth={false} style={{...style }}>
        <ProductosActividadesRealizadas matricula={user.estudiante.matricula} />
      </Container>
    </>
  );
};

function getCursosEstudiante(listaCursos: any) {
  let arrayCursos: CursosAlumnoGql = {
    Finalizados: [],
    Pendientes: [],
    EnProceso: [],
  };
  listaCursos?.data?.forEach((curso: CursoGql) => {
    curso.Estatus = getEstatus(curso.FechaIni, curso.FechaFin);
    if (curso.Estatus == Estatus.Finalizado) {
      arrayCursos.Finalizados.push(curso);
    } else if (curso.Estatus == Estatus.Pendiente) {
      arrayCursos.Pendientes.push(curso);
    } else {
      arrayCursos.EnProceso.push(curso);
    }
  });
  arrayCursos.Finalizados.sort((a, b) => {
    if (a.FechaFin > b.FechaFin) return -1;
    if (a.FechaFin < b.FechaFin) return 1;
    return 0;
  });
  return arrayCursos;
}

function getCuatrimestresSemestres(listaCursos: any) {
  let ids: number[] = [];
  let CuaSem: CSGql[] = [];
  let arrayCS: SemestresCuatrimestresGql = {
    Finalizados: [],
    Pendientes: [],
    EnProceso: [],
  };
  listaCursos?.data?.forEach((curso: CursoGql) => {
    if (!ids.includes(curso.IdPeriodo)) {
      CuaSem[curso.IdPeriodo] = {
        ...curso,
        CalificacionPendiente: CalificacionPendiente(curso),
        Calificacion: curso.CalificacionNumerico,
        Cursos: [curso],
        Estatus: getEstatus(curso.FechaInicioPeriodo, curso.FechaFinPeriodo),
      };
      ids.push(curso.IdPeriodo);
    } else {
      let currentCS = CuaSem[curso.IdPeriodo];
      let Numerador = 0;
      let Denominador = 0;
      if(!currentCS.BoletaInscripcion && curso.BoletaInscripcion){
        currentCS.BoletaInscripcion = curso.BoletaInscripcion;
      }
      currentCS.Creditos += curso.Creditos;
      currentCS.Cursos.push(curso);
      currentCS.Cursos.forEach(curso => {
        if(!CalificacionPendiente(curso)){
          Numerador += curso.CalificacionNumerico;
          Denominador += 1;
        }
      });
      currentCS.Calificacion = Numerador/Denominador;
      currentCS.CalificacionPendiente = !CalificacionPendiente(curso)
        ? currentCS.CalificacionPendiente
        : true;
    }
  });
  CuaSem.forEach(CS => {
    if (CS.Estatus == Estatus.Finalizado) {
      arrayCS.Finalizados.push(CS);
    } else if (CS.Estatus == Estatus.Pendiente) {
      arrayCS.Pendientes.push(CS);
    } else {
      arrayCS.EnProceso.push(CS);
    }
  });
  return arrayCS;
}

function getEstatus(FechaIni: string, FechaFin: string) {
  let estatus: Estatus;
  if (Date.now() > Date.parse(FechaFin)) {
    estatus = Estatus.Finalizado;
  } else if (Date.now() < Date.parse(FechaIni)) {
    estatus = Estatus.Pendiente;
  } else {
    estatus = Estatus.EnProceso;
  }
  return estatus;
}

function CalificacionPendiente(curso: CursoGql){
  if(curso.BoletaCalificaciones && curso.BoletaCalificaciones[0] &&
    curso.BoletaCalificaciones[0].IDMOC == curso.IdMateriasOfertaClave &&
    curso.BoletaCalificaciones[0].NombreArchivoBoletaMateria &&
    curso.BoletaCalificaciones[0].NombreArchivoBoletaMateria != ""
  ){
    return false;
  }else{
    return true;
  }
}

export default TableroPlanEstudios;


/* TEMPORAL */

function crearJSON() {
  return {
    data: [
      {
        Creditos: 6,
        FechaFinCurso: '2023-06-05T00:00:00',
        FechaInicioCurso: '2023-06-30T00:00:00',
        fechaLimiteAltaACurso: '2023-05-05T23:59:00',
        Clave: 'AD1004',
        Profesor_responsable: 'Ramón Mariaca Méndez',
        NombreMateria: 'Etnobiología y conocimientos locales',
        IdMateriasOfertaAnual: 8857,
        GradoDeCurso: 'Maestría',
        SedeDeCurso: 'San Cristóbal',
      },
      {
        Creditos: 6,
        FechaFinCurso: '2023-06-05T00:00:00',
        FechaInicioCurso: '2023-06-30T00:00:00',
        fechaLimiteAltaACurso: '2023-05-05T23:59:00',
        Clave: 'AD1031',
        Profesor_responsable: 'José Armando Alayón Gamboa',
        NombreMateria:
          'Ecología del Pastoreo y Ramoneo en Sistemas Ganaderos Tropicales',
        IdMateriasOfertaAnual: 8858,
        GradoDeCurso: 'Maestría',
        SedeDeCurso: 'Campeche',
      },
      {
        Creditos: 6,
        FechaFinCurso: '2023-06-05T00:00:00',
        FechaInicioCurso: '2023-06-30T00:00:00',
        fechaLimiteAltaACurso: '2023-05-05T23:59:00',
        Clave: 'AD1032',
        Profesor_responsable: 'Jorge Omar López Martínez',
        NombreMateria:
          'Fundamentos de percepción remota y ecología del paisaje',
        IdMateriasOfertaAnual: 8859,
        GradoDeCurso: 'Maestría',
        SedeDeCurso: 'Chetumal',
      },
      {
        Creditos: 6,
        FechaFinCurso: '2023-06-05T00:00:00',
        FechaInicioCurso: '2023-06-30T00:00:00',
        fechaLimiteAltaACurso: '2023-05-05T23:59:00',
        Clave: 'AD1024',
        Profesor_responsable: 'Mateo Mier y Terán Giménez Cacho',
        NombreMateria: 'Agroecología política',
        IdMateriasOfertaAnual: 8860,
        GradoDeCurso: 'Maestría',
        SedeDeCurso: 'San Cristóbal',
      },
      {
        Creditos: 6,
        FechaFinCurso: '2023-06-05T00:00:00',
        FechaInicioCurso: '2023-06-30T00:00:00',
        fechaLimiteAltaACurso: '2023-05-05T23:59:00',
        Clave: 'BN1001',
        Profesor_responsable: 'Juan Manuel Pat Fernández',
        NombreMateria: 'Economía ecológica',
        IdMateriasOfertaAnual: 8862,
        GradoDeCurso: 'Maestría',
        SedeDeCurso: 'Campeche',
      },
      {
        Creditos: 6,
        FechaFinCurso: '2023-06-05T00:00:00',
        FechaInicioCurso: '2023-06-30T00:00:00',
        fechaLimiteAltaACurso: '2023-05-05T23:59:00',
        Clave: 'AE1002',
        Profesor_responsable: 'Jorge Leonel León Cortés',
        NombreMateria: 'Ecología del Paisaje',
        IdMateriasOfertaAnual: 8695,
        GradoDeCurso: 'Maestría',
        SedeDeCurso: 'San Cristóbal',
      },
      {
        Creditos: 6,
        FechaFinCurso: '2023-06-05T00:00:00',
        FechaInicioCurso: '2023-06-30T00:00:00',
        fechaLimiteAltaACurso: '2023-05-05T23:59:00',
        Clave: 'AA1035',
        Profesor_responsable: 'Eduardo Suárez Morales',
        NombreMateria: 'Ecología y taxonomía del zooplancton marino',
        IdMateriasOfertaAnual: 8696,
        GradoDeCurso: 'Maestría',
        SedeDeCurso: 'Chetumal',
      },
      {
        Creditos: 6,
        FechaFinCurso: '2023-06-05T00:00:00',
        FechaInicioCurso: '2023-06-30T00:00:00',
        fechaLimiteAltaACurso: '2023-05-05T23:59:00',
        Clave: 'AA1037',
        Profesor_responsable: 'Georgina Sánchez Ramírez',
        NombreMateria:
          'Sexualidad y Salud Reproductiva desde el enfoque feminista de género y derechos humanos',
        IdMateriasOfertaAnual: 8705,
        GradoDeCurso: 'Maestría',
        SedeDeCurso: 'San Cristóbal',
      },
      {
        Creditos: 6,
        FechaFinCurso: '2023-06-05T00:00:00',
        FechaInicioCurso: '2023-06-30T00:00:00',
        fechaLimiteAltaACurso: '2023-05-05T23:59:00',
        Clave: 'AB1015',
        Profesor_responsable: 'Héctor Ochoa Díaz-López',
        NombreMateria: 'Sistemas y políticas de salud',
        IdMateriasOfertaAnual: 8706,
        GradoDeCurso: 'Maestría',
        SedeDeCurso: 'San Cristóbal',
      },
      {
        Creditos: 6,
        FechaFinCurso: '2023-06-05T00:00:00',
        FechaInicioCurso: '2023-06-30T00:00:00',
        fechaLimiteAltaACurso: '2023-05-05T23:59:00',
        Clave: 'AE1051',
        Profesor_responsable: 'Alma Estrella García Morales',
        NombreMateria: 'Filogeografía: teoría y práctica',
        IdMateriasOfertaAnual: 8736,
        GradoDeCurso: 'Maestría',
        SedeDeCurso: 'Chetumal',
      },
      {
        Creditos: 6,
        FechaFinCurso: '2023-06-05T00:00:00',
        FechaInicioCurso: '2023-06-30T00:00:00',
        fechaLimiteAltaACurso: '2023-05-05T23:59:00',
        Clave: 'AE1052',
        Profesor_responsable: 'Alejandro Hiram Cueva Rodríguez',
        NombreMateria: 'Métodos avanzados de estadística en ecología',
        IdMateriasOfertaAnual: 8737,
        GradoDeCurso: 'Maestría',
        SedeDeCurso: 'Villahermosa',
      },
      {
        Creditos: 6,
        FechaFinCurso: '2023-06-05T00:00:00',
        FechaInicioCurso: '2023-06-30T00:00:00',
        fechaLimiteAltaACurso: '2023-05-05T23:59:00',
        Clave: 'AE1014',
        Profesor_responsable: 'Rafael Ángel Reyna Hurtado',
        NombreMateria: 'Ecología del movimiento a nivel de paisaje',
        IdMateriasOfertaAnual: 8738,
        GradoDeCurso: 'Maestría',
        SedeDeCurso: 'Campeche',
      },
      {
        Creditos: 6,
        FechaFinCurso: '2023-06-05T00:00:00',
        FechaInicioCurso: '2023-06-30T00:00:00',
        fechaLimiteAltaACurso: '2023-05-05T23:59:00',
        Clave: 'AB1029',
        Profesor_responsable: 'Ramón Abraham Mena Farrera',
        NombreMateria:
          'Género y otras desigualdades en la Frontera Sur de México',
        IdMateriasOfertaAnual: 8748,
        GradoDeCurso: 'Maestría',
        SedeDeCurso: 'San Cristóbal',
      },
      {
        Creditos: 6,
        FechaFinCurso: '2023-06-05T00:00:00',
        FechaInicioCurso: '2023-06-30T00:00:00',
        fechaLimiteAltaACurso: '2023-05-05T23:59:00',
        Clave: 'AA1036',
        Profesor_responsable: 'Iván Francisco Porraz Gómez',
        NombreMateria: 'Migraciones en la frontera sur',
        IdMateriasOfertaAnual: 8749,
        GradoDeCurso: 'Maestría',
        SedeDeCurso: 'Tapachula',
      },
      {
        Creditos: 6,
        FechaFinCurso: '2023-06-05T00:00:00',
        FechaInicioCurso: '2023-06-30T00:00:00',
        fechaLimiteAltaACurso: '2023-05-05T23:59:00',
        Clave: 'AC4006',
        Profesor_responsable: 'Rebeca González Gómez',
        NombreMateria: 'Manejo integrado de plagas',
        IdMateriasOfertaAnual: 8755,
        GradoDeCurso: 'Maestría',
        SedeDeCurso: 'Tapachula',
      },
      {
        Creditos: 6,
        FechaFinCurso: '2023-06-05T00:00:00',
        FechaInicioCurso: '2023-06-30T00:00:00',
        fechaLimiteAltaACurso: '2023-05-05T23:59:00',
        Clave: 'AC1005',
        Profesor_responsable: 'Julio César Rojas León',
        NombreMateria: 'Interacciones insecto-planta',
        IdMateriasOfertaAnual: 8756,
        GradoDeCurso: 'Maestría',
        SedeDeCurso: 'Tapachula',
      },
      {
        Creditos: 6,
        FechaFinCurso: '2023-06-05T00:00:00',
        FechaInicioCurso: '2023-06-30T00:00:00',
        fechaLimiteAltaACurso: '2023-05-05T23:59:00',
        Clave: 'AG1013',
        Profesor_responsable: 'María Azahara Mesa Jurado',
        NombreMateria: 'Transdisciplina para la sustentabilidad',
        IdMateriasOfertaAnual: 8762,
        GradoDeCurso: 'Maestría',
        SedeDeCurso: 'Villahermosa',
      },
      {
        Creditos: 6,
        FechaFinCurso: '2023-06-05T00:00:00',
        FechaInicioCurso: '2023-06-30T00:00:00',
        fechaLimiteAltaACurso: '2023-05-05T23:59:00',
        Clave: 'AG1010',
        Profesor_responsable: 'Dolores Ofelia Molina Rosales',
        NombreMateria: 'Género y medio ambiente',
        IdMateriasOfertaAnual: 8763,
        GradoDeCurso: 'Maestría',
        SedeDeCurso: 'Campeche',
      },
      {
        Creditos: 6,
        FechaFinCurso: '2023-06-05T00:00:00',
        FechaInicioCurso: '2023-06-30T00:00:00',
        fechaLimiteAltaACurso: '2023-05-05T23:59:00',
        Clave: 'AF7003',
        Profesor_responsable: 'Teresa Álvarez Legorreta',
        NombreMateria: 'Contaminación ambiental',
        IdMateriasOfertaAnual: 8774,
        GradoDeCurso: 'Maestría',
        SedeDeCurso: 'Chetumal',
      },
      {
        Creditos: 6,
        FechaFinCurso: '2023-06-05T00:00:00',
        FechaInicioCurso: '2023-06-30T00:00:00',
        fechaLimiteAltaACurso: '2023-05-05T23:59:00',
        Clave: 'AF1014',
        Profesor_responsable: 'Guadalupe Eugenia Zarza Franco',
        NombreMateria: 'Aplicaciones bioinformáticas',
        IdMateriasOfertaAnual: 8775,
        GradoDeCurso: 'Maestría',
        SedeDeCurso: 'Tapachula',
      },
    ],
  };
}
