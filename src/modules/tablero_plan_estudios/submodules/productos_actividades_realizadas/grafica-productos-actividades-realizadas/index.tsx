import { GraficaPastel } from '@shared/components/graficas/graficaPastel';
import {
  Alineacion,
  GraficaColor,
  GraficaPastelType,
} from '@shared/types/graficasTypes';
import { IListProductosActividadesRealizadas } from '../IProductosActividadRealizada';

const GraficaProductosActividadesRealizadas = ({
  data,
}: {
  data: IListProductosActividadesRealizadas;
}) => {
  const dataExample: GraficaPastelType = {
    Alineacion: Alineacion.Derecha,
    Items: [
      {
        Titulo: 'Publicaciones',
        Valor: data.publicaciones.length,
        Color: GraficaColor.amarillo,
      },
      {
        Titulo: 'Cursos',
        Valor: data.cursos.length,
        Color: GraficaColor.violeta,
      },
      {
        Titulo: 'Estancias',
        Valor: data.estancias.length,
        Color: GraficaColor.turquesa,
      },
      {
        Titulo: 'Congresos',
        Valor: data.congresos.length,
        Color: GraficaColor.rojo,
      },
    ],
  };
  return (
    <>
      <GraficaPastel data={dataExample} />
    </>
  );
};

export default GraficaProductosActividadesRealizadas;
