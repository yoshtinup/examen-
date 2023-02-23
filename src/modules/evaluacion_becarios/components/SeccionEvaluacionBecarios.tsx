import React from 'react';
import { useQuery } from 'react-query';
import { Grid } from '@mui/material';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import { useRecoilValue } from 'recoil';
import { userStateAtom } from '@modules/auth/recoil';
import { getEvaluaciones } from '../queries';
import { CardList } from '@shared/components/cards';
import { CardListType, CardListItemSimple } from '@shared/types/cardsTypes';
import { EvaluacionGql, Db12EvaluacionBecario } from '../types';
import { useRouter } from 'next/router';

const ServiciosEscolaresIndex: React.FC<{
  evaluations: EvaluacionGql;
}> = ({ evaluations }) => {
  const router = useRouter();
  const [mappedEvaluations, setMappedEvaluations] =
    React.useState<CardListType[]>();
  const [evaluation, setEvaluation] = React.useState<number>();

  React.useEffect(() => {
    if (evaluations.db12_EvaluacionBecario) {
      const getEvaluation = evaluations?.db12_EvaluacionBecario.filter(
        data => data.PorcentajeAvance > 0
      );
      setEvaluation(getEvaluation[0].PorcentajeAvance);

      const newEvaluations: CardListType[] =
        evaluations?.db12_EvaluacionBecario.map(
          (data: Db12EvaluacionBecario) => {
            const date = new Date(data.FechaEvaluacion);
            let itemsEvaluation: CardListItemSimple[] = [];
            if (data.Estatus.Value === 'Evaluado y firmado') {
              itemsEvaluation = [
                {
                  Titulo: 'Porcentaje de avance',
                  Subtitulo: `${data.PorcentajeAvance}`,
                },
                {
                  Titulo: 'Recomendación',
                  Subtitulo: data.Recomendacion.Value,
                },
                {
                  Titulo: 'Formato de evaluación',
                  Subtitulo: `https://serviciosposgr...`,
                  Onclick: () => {
                    router.push(
                      `https://serviciosposgrado.ecosur.mx/profesores/Content/EvaluacionBecarios/${data.Acta}`
                    );
                  },
                },
                {
                  Titulo: 'Fecha de evaluación',
                  Subtitulo: date.toLocaleDateString(),
                },
              ];
            }

            return {
              Titulo: data.PeriodoEvaluacion.Semestre.Value,
              Items:
                data.Estatus.Value === 'Evaluado y firmado'
                  ? [
                      {
                        Titulo: 'Estatus',
                        OpenDefault: false,
                        Subtitulo: data.Estatus.Value,
                      },
                      {
                        Titulo: 'Evaluación',
                        OpenDefault: true,
                        Childrens: itemsEvaluation,
                      },
                    ]
                  : [
                      {
                        Titulo: 'Estatus',
                        OpenDefault: false,
                        Subtitulo: data.Estatus.Value,
                      },
                    ],
            };
          }
        );

      setMappedEvaluations(newEvaluations);
    }
  }, []);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="body1" gutterBottom>
            <b>PORCENTAJE DE AVANCE: {evaluation}%</b>
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1" gutterBottom>
            <b>EVALUACIONES</b>
          </Typography>
        </Grid>
        {evaluations.db12_EvaluacionBecario
          ? mappedEvaluations?.map((evaluation, i) => (
              <Grid item xs={3}>
                <CardList key={i} data={evaluation} />
              </Grid>
            ))
          : null}
      </Grid>
    </>
  );
};

const SeccionEvaluacionBecariosFetch: React.FC<unknown> = () => {
  const { estudiante } = useRecoilValue(userStateAtom);
  const { data, error, isLoading } = useQuery('se-conformacion-ct', async () =>
    getEvaluaciones(/* estudiante.matricula */ 202011026)
  );

  if (isLoading) return <CircularProgress />;
  if (error) return <Alert severity="error">No se pudo acceder</Alert>;

  return (
    <>
      {data.db12_EvaluacionBecario ? (
        <ServiciosEscolaresIndex evaluations={data} />
      ) : (
        <Alert severity="info">No tienes</Alert>
      )}
    </>
  );
};

const SeccionEvaluacionBecarios = () => {
  return (
    <>
      <SeccionEvaluacionBecariosFetch />
    </>
  );
};

export default SeccionEvaluacionBecarios;