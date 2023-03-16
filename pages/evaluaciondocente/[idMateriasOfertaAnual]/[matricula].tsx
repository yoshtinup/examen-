import { Container, Box } from '@mui/material';
import { HeaderSection } from '@shared/components';
import { Layout } from '@shared/components/layouts';
import EvaluacionDocente from '@modules/evaluaciondocente';
import { useEffect, useState, ReactElement } from 'react';
import { DatosActividades } from '@modules/evaluaciondocente/types/evaluacionState';
import { useRouter } from 'next/router';
import EvaluacionDocenteQuerys from '@modules/evaluaciondocente/queries/apiRest';

const PageData = () => {
  const router = useRouter()
  console.log(router.query.idMateriasOfertaAnual);
  const [docente, setDocente]=useState<DatosActividades>({nombre: "", profesores: []});
  
  const profesor = docente.profesores;

  const obtenerDatos = async () => {
    const resultado = await EvaluacionDocenteQuerys.getObtenerDatos(router.query.idMateriasOfertaAnual)
    console.log(resultado)
  } 
  useEffect(() => {
    obtenerDatos()
    },[]);
   console.log(docente.profesores);

  return (
    <Container maxWidth= "xl" style = {{paddingTop: '30px'}}>
      <HeaderSection label="EVALUACIÓN DOCENTE"/>
      <Box
        display="column"
        alignItems="center"
        justifyContent="center"
        style={{ padding: '30px !important', backgroundColor: '#fff' }}
      >
        <h3>Asignatura: {docente.nombre}</h3>
        {profesor.map((i)=>(
          <div key={i.idProfesores}>
            <h3>Personal Docente: {i.name}</h3>
          </div>
        ))}
      
        <EvaluacionDocente />
      </Box>
    </Container>
  );
};

PageData.getLayout = function getLayout(page:ReactElement){
  return <Layout>{page}</Layout>;
};

export default PageData;

      
      
      