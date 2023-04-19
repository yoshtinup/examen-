export interface IProductoActividadRealizada {
  nombre: string;
  annio?: number;
  publicadoen?: string;
  tipoparticipacion?: string;
  tipoarbitrado?: string;
  fechainicio?: string;
  fechaconclusion?: string;
  institucion?: string;
  area?: string;
  ambito?: string;
  lugar?: string;
  fecha?: string;
}

export interface IListProductosActividadesRealizadas {
  publicaciones: IProductoActividadRealizada[];
  cursos: IProductoActividadRealizada[];
  estancias: IProductoActividadRealizada[];
  congresos: IProductoActividadRealizada[];
}
