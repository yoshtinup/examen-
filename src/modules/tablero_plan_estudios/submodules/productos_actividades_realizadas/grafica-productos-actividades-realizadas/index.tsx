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
    NoData: "No se han registrado productos y actividades",
    Alineacion: Alineacion.Arriba,
    Porcentajes: true,
    Items: [
      {
        Titulo: 'Publicaciones',
        Valor: data.publicaciones.length || 0,
        Color: GraficaColor.amarillo,
      },
      {
        Titulo: 'Cursos',
        Valor: data.cursos.length || 0,
        Color: GraficaColor.violeta,
      },
      {
        Titulo: 'Estancias',
        Valor: data.estancias.length || 0,
        Color: GraficaColor.turquesa,
      },
      {
        Titulo: 'Congresos',
        Valor: data.congresos.length || 0,
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
