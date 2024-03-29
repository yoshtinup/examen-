export enum GraficaColor {
  blanco = '#fff',
  amarillo = '#ffee65',
  violeta = '#bd7ebe',
  turquesa = '#fdcce5',
  rojo = '#fd7f6f',
  verde = '#b2e061',
  azul = '#7eb0d5',
  negro = '#000',
}

export enum Alineacion {
  Izquierda,
  Derecha,
  Arriba,
  Abajo,
}

export interface GraficaSimple {
  Header?: React.ReactNode;
  Items: GraficaItemSimple[];
  Footer?: React.ReactNode;
  NoData?: String;
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

export interface GraficaPastelType extends GraficaSimple {
  Alineacion: Alineacion;
  Porcentajes?: boolean;
}

export interface GraficaBarrasGraduacion {
  Min: number;
  Max: number;
  Step: number;
}

export interface GraficaBarrasItemChildrens extends GraficaItemSimple {
  Childrens?: GraficaItemSimple[];
}
