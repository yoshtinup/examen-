import { ReactElement } from 'react';
import { Container, Box } from '@mui/material';
import { HeaderSection } from '@shared/components';
import { Layout } from '@shared/components/layouts';
import EvaluacionDocente from '@modules/evaluaciondocente';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { DatosActividades, Actividades, Profesore, PlaneacionDelCurso } from '@modules/evaluaciondocente/types/evaluacionState';
import { useRouter } from 'next/router';

const PageDocente = () => {
  const router = useRouter()
  console.log(router.query);
  const [docente, setDocente]=useState<DatosActividades>({nombre: "", fechaImparticion: "", evaluoCurso: true, idUnidad: 5, profesores: []});
  // useEffect(()=>{
  //   axios.post('https://dev-api-posgrado.utic.ecosur.mx/EvaluacionDocente/EstudianteInterno/obtenerDatos?idMateriasOfertaAnual=8632', {
  //     headers: {
  //       'Content-Type': 'application/json',
  //       "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJ1YmVuLmd1dGllcnJlekBndWVzdC5lY29zdXIubXgiLCJyb2wiOiJJbnRlcm5vIiwibmJmIjoxNjc4MjE5MzAyLCJleHAiOjE2ODA4OTc3MDIsImlhdCI6MTY3ODIxOTMwMn0.-ROyYCa8Ub7uDedw8dkHLpEGLqjbR0uqr-fvdJNtW3U"
  //     },
  //     body: JSON.stringify({idMateriasOfertaAnual:"8632"})
  //   })
  //         .then((response) => {
  //           console.log (response.data)
  //           setDocente (response.data)
  //         })
  //         .catch((error) => {
  //           console.log(error);
  //         });
    
  useEffect(() => {
        fetch('https://dev-api-posgrado.utic.ecosur.mx/EvaluacionDocente/EstudianteInterno/obtenerDatos?idMateriasOfertaAnual=8632',{
      method: "POST",
      //body: JSON.stringify({idMateriasOfertaAnual:"8632"}),
      headers: {
        'Content-Type':'application/json',
        //'Content':'application/json',
        'Authorization':'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJ1YmVuLmd1dGllcnJlekBndWVzdC5lY29zdXIubXgiLCJyb2wiOiJJbnRlcm5vIiwibmJmIjoxNjc4MjE5MzAyLCJleHAiOjE2ODA4OTc3MDIsImlhdCI6MTY3ODIxOTMwMn0.-ROyYCa8Ub7uDedw8dkHLpEGLqjbR0uqr-fvdJNtW3U'
      }
    }).then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(response => console.log('Success:', response));
    },[]);
   console.log(docente);

  return (
    <Container maxWidth= "xl" style = {{paddingTop: '30px'}}>
      <HeaderSection label="EVALUACIÓN DOCENTE"/>
      <Box
        display="column"
        alignItems="center"
        justifyContent="center"
        style={{ padding: '30px !important', backgroundColor: '#fff' }}
      >
        <EvaluacionDocente />
      </Box>
    </Container>
  );
};

PageDocente.getLayout = function getLayout(page:ReactElement){
  return <Layout>{page}</Layout>;
};

export default PageDocente;

      
      
      