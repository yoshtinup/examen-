import { Container, Box } from '@mui/material';
import { HeaderSection } from '@shared/components';
import { Layout } from '@shared/components/layouts';
import EvaluacionDocente from '@modules/evaluaciondocente';
import { useEffect, useState, ReactElement } from 'react';
import { DatosActividades } from '@modules/evaluaciondocente/types/evaluacionState';
import { useRouter } from 'next/router';
import EvaluacionDocenteQuerys from '@modules/evaluaciondocente/queries/apiRest';

const PageData = () => {
  const router = useRouter();
  console.log(router.query.idMateriasOfertaAnual);
  const [docente, setDocente] = useState<DatosActividades>({
    nombre: '',
    profesores: [],
  });
  //const [docente, setDocente]=useState<DatosActividades>({nombre: "", profesores: []});
  //const profesor = docente.profesores;

  const materia = router.query.idMateriasOfertaAnual;

  const obtenerDatos = async idMateriasOfertaAnual => {
    console.log('router.query.idMateriasOfertaAnual', idMateriasOfertaAnual);
    const resultado = await EvaluacionDocenteQuerys.getObtenerDatos(
      idMateriasOfertaAnual
    );
    setDocente(resultado);
    //console.log(resultado)
  };
  useEffect(() => {
    if (materia !== undefined) {
      obtenerDatos(materia);
    }
  }, [materia]);

  //console.log(docente.profesores)

  return (
    <Container maxWidth="xl" style={{ paddingTop: '30px' }}>
      <HeaderSection label="EVALUACIÓN DOCENTE" />
      <Box
        display="column"
        alignItems="center"
        justifyContent="center"
        style={{ padding: '30px !important', backgroundColor: '#fff' }}
      >
        {docente && (
          <div>
            <h3>Asignatura: {docente.nombre}</h3>

            <div>
              {docente.profesores.map(i => (
                <div key={i.idProfesores}>
                  <h3>Docente: {i.name}</h3>
                </div>
              ))}
            </div>
          </div>
        )}

        <EvaluacionDocente docentes={docente.profesores} />
      </Box>
    </Container>
  );
};

PageData.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default PageData;
