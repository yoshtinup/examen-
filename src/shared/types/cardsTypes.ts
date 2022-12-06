type OnClickFunction = () => any;

export enum FontSize{
  large = 20,
  middle = 18,
  small = 15
}

export interface CardListItemSimple{
  Titulo: string;
  Subtitulo?: string;
  Icono?: React.ReactNode;
  Onclick?: OnClickFunction;
  FontSize?: FontSize;
}

export interface CardListItemChildrens extends CardListItemSimple{
  Childrens?: CardListItemSimple[];
}

export interface CardListType {
  Titulo: string;
  Subtitulo?: string;
  Icono?: React.ReactNode;
  Items: CardListItemChildrens[];
}
