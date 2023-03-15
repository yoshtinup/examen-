export enum GraficaColor{
  blanco = "#fff",
  amarillo = "#ff0",
  violeta = "#f0f",
  turquesa = "#0ff",
  rojo = "#f00",
  verde = "#0f0",
  azul = "#00f",
  negro = "#000"
}

export enum Alineacion{
  Izquierda,
  Derecha
}

export interface GraficaSimple {
  Header?: React.ReactNode;
  Items: GraficaItemSimple[];
  Footer?: React.ReactNode;
}

export interface GraficaItemSimple {
  Titulo: string;
  Valor: number;
  Color: GraficaColor;
}

export interface GraficaBarrasType extends GraficaSimple {
  Graduacion: GraficaBarrasGraduacion;
  Items: GraficaBarrasItemChildrens[];
}

export interface GraficaPastelType extends GraficaSimple{
  Alineacion: Alineacion;
}

export interface GraficaBarrasGraduacion {
  Min: number;
  Max: number;
  Step: number;
}

export interface GraficaBarrasItemChildrens extends GraficaItemSimple {
  Childrens?: GraficaItemSimple[];
}