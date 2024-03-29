import { Container, Box } from '@mui/material';
import { HeaderSection } from '@shared/components';
import { Layout } from '@shared/components/layouts';
import EvaluacionDocente from '@modules/evaluaciondocente';
import { useEffect, useState, ReactElement } from 'react';
import { DatosMateria } from '@modules/evaluaciondocente/types/evaluacionState';
import { useRouter } from 'next/router';
import EvaluacionDocenteQuerys from '@modules/evaluaciondocente/queries/apiRest';
import { useRecoilState } from 'recoil';
import { profesoresState } from '@modules/evaluaciondocente/recoil/profesoresState';

const PageData = () => {
  const router = useRouter();
  const [profesores, setProfesores] = useRecoilState(profesoresState);
  const [materia, setMateria] = useState<DatosMateria>({
    idMateriasOfertaAnual: 0,
    nombre: '',
  });

  const idMateria = router.query.idMateriasOfertaAnual;

  const obtenerDatos = async idMateriasOfertaAnual => {
    const resultado = await EvaluacionDocenteQuerys.getObtenerDatos(
      idMateriasOfertaAnual
    );
    setMateria({
      idMateriasOfertaAnual: parseInt(idMateria.toString()),
      nombre: resultado.nombre,
    });
    //Guardar estado en recoil en el profesoresState
    setProfesores(resultado.profesores);
  };
  useEffect(() => {
    if (idMateria !== undefined) {
      obtenerDatos(idMateria);
    }
  }, [idMateria]);

  return (
    <Container maxWidth="xl" style={{ paddingTop: '30px' }}>
      <HeaderSection label="EVALUACIÓN DOCENTE" />
      <Box display="column" sx={{ p: 2 }} style={{ backgroundColor: '#fff' }}>
        {materia && (
          <div>
            <h3>Asignatura: {materia.nombre}</h3>
          </div>
        )}
        <EvaluacionDocente />
      </Box>
    </Container>
  );
};

PageData.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default PageData;
