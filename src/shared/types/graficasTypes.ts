export enum ColorBarra{
  large = 20,
  middle = 18,
  small = 15
}

export interface GraficaBarras {
  Header?: React.ReactNode;
  Graduacion: GraficaBarrasGraduacion;
  Items: GraficaBarrasItemChildrens[];
  Footer?: React.ReactNode;
}

export interface GraficaBarrasGraduacion {
  Min: number;
  Max: number;
  Step: number;
}

export interface GraficaBarrasItemSimple{
  Titulo: string;
  Valor: number;
  Color: ColorBarra;
}

export interface GraficaBarrasItemChildrens extends GraficaBarrasItemSimple {
  Childrens: GraficaBarrasItemSimple[];
}