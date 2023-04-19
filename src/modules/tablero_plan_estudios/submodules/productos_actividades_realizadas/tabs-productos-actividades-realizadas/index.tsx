import { EcosurTabs } from 'ecosur-ui';
import {
  IListProductosActividadesRealizadas,
  IProductoActividadRealizada,
} from '../IProductosActividadRealizada';
import ListProductosActividadesRealizadas from '../list-productos-actividades-realizadas';

import {
  columnCongresos,
  columnCursos,
  columnEstancias,
  columnsPublicaciones,
} from '../columns-data';

const TabsProductosActividadesRealizadas = ({
  data,
}: {
  data: IListProductosActividadesRealizadas;
}) => {
  const publicaciones: IProductoActividadRealizada[] = data.publicaciones.sort(
    (a: IProductoActividadRealizada, b: IProductoActividadRealizada) =>
      b.annio - a.annio
  );

  const cursos: IProductoActividadRealizada[] = data.cursos.sort(
    (a: IProductoActividadRealizada, b: IProductoActividadRealizada) =>
      new Date(b.fechainicio).getTime() - new Date(a.fechainicio).getTime()
  );

  const estancias: IProductoActividadRealizada[] = data.estancias.sort(
    (a: IProductoActividadRealizada, b: IProductoActividadRealizada) =>
      new Date(b.fechainicio).getTime() - new Date(a.fechainicio).getTime()
  );

  const congresos: IProductoActividadRealizada[] = data.congresos.sort(
    (a: IProductoActividadRealizada, b: IProductoActividadRealizada) =>
      new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
  );

  const tabCursos = [
    {
      titulo: 'Publicaciones',
      componente: (
        <ListProductosActividadesRealizadas
          productos={publicaciones}
          columns={columnsPublicaciones}
        />
      ),
    },
    {
      titulo: 'Cursos',
      componente: (
        <ListProductosActividadesRealizadas
          productos={cursos}
          columns={columnCursos}
        />
      ),
    },
    {
      titulo: 'Estancias',
      componente: (
        <ListProductosActividadesRealizadas
          productos={estancias}
          columns={columnEstancias}
        />
      ),
    },
    {
      titulo: 'Congresos',
      componente: (
        <ListProductosActividadesRealizadas
          productos={congresos}
          columns={columnCongresos}
        />
      ),
    },
  ];

  return (
    <>
      <EcosurTabs
        data={tabCursos}
        align="left"
        activeColor="#ecf0f5"
        activeTextColor="black"
        key="ecosur-tabs-cursos"
      />
    </>
  );
};

export default TabsProductosActividadesRealizadas;
