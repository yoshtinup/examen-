import * as React from 'react';
import { EstatusProcesoCT } from '@modules/consejo_tutelar/components';
import { useGetEstudianteCTEstatus } from '@modules/consejo_tutelar/queries';

export default function Estatus({ matricula }: { matricula: number }) {
  const queryStatus = useGetEstudianteCTEstatus(matricula);
  const [estatus, setEstatus] = React.useState<string>('');
  React.useEffect(() => {
    function setState() {
      if (queryStatus.isSuccess) {
        if (queryStatus.data.length > 0) {
          setEstatus(queryStatus.data[0].Estatus.Leyenda);
        }
      }
    }
    setState();
  }, [queryStatus]);
  return <EstatusProcesoCT estatus={estatus} />;
}
