import * as React from 'react';
import { Grid } from '@mui/material';
import {
  GraficaBarrasGraduacion,
  GraficaBarrasItemChildrens,
  GraficaItemSimple,
  GraficaBarrasType
} from '@shared/types';

const textStyle:React.CSSProperties = {
  fontSize: "20px"
};

type GraficaBarrasLineData = {
  Text: string;
  TextX: number;
  TextY: number;
  PathD: string;
}

export function GraficaBarras(props:any) {
  const data:GraficaBarrasType = props.data;
  if(!data){
    return <></>;
  }
  const LineasVerticales:GraficaBarrasLineData[] = ObtenerVerticales(data.Items);
  const LineasHorizontales:GraficaBarrasLineData[] = ObtenerHorizontales(data.Graduacion);
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        {data.Header && data.Header}
      </Grid>
      <svg viewBox='0 0 1000 600'>
        {LineasVerticales.map((item, i)=><Linea key={i} data={item} />)}
        {LineasHorizontales.map((item, i)=><Linea key={i} data={item} />)}
        {data.Items.map((item, i) => {
          if(item.Childrens && item.Childrens.length > 0){
            return <CrearGrupoBarras key={i} item={item} graduacion={data.Graduacion} totalItems={data.Items.length} posicion={i} />;
          }else{
            return <CrearBarraIndividual key={i} item={item} graduacion={data.Graduacion} totalItems={data.Items.length} posicion={i} />;
          }
        })}
      </svg>
      <Grid item xs={12}>
        {data.Footer && data.Footer}
      </Grid>
    </Grid>
  );
}

function ObtenerVerticales(items: GraficaBarrasItemChildrens[]){
  let LineasVerticales:GraficaBarrasLineData[] = [];
  const itemsCount = items.length;
  const VStep = 850/itemsCount;
  for(let x=0; x<=itemsCount; x+=1){
    const Xn = 100 + VStep*x;
    LineasVerticales.push({
      Text: items[x] ? items[x].Titulo : "",
      TextX: items[x] ? Xn + ((VStep-(items[x].Titulo.length*10))/2) : 0,
      TextY: 550,
      PathD: "M " + Xn + " 45 V 530"
    });
  }
  return LineasVerticales;
}

function ObtenerHorizontales(graduacion:GraficaBarrasGraduacion){
  let LineasHorizontales:GraficaBarrasLineData[] = [];
  const itemsCount = (graduacion.Max - graduacion.Min)/graduacion.Step;
  const HStep = 475/itemsCount;
  for(let x=0; x<=itemsCount; x+=1){
    const itemValue = graduacion.Min + graduacion.Step*x;
    const Yn = 525 - HStep*x;
    LineasHorizontales.push({
      Text: itemValue.toString(),
      TextX: 75 - (itemValue.toString().length*11),
      TextY: Yn+5,
      PathD: "M 85 " + Yn + " H 955"
    });
  }
  return LineasHorizontales;
}

function Linea(props:any){
  const data:GraficaBarrasLineData = props.data;
  return (
    <>
      <text x={data.TextX} y={data.TextY} style={textStyle} >{data.Text}</text>
      <path stroke="#a7a7a7" strokeWidth="1" d={data.PathD} />
    </>
  );
}

function CrearBarraIndividual(props:any){
  const graduacion:GraficaBarrasGraduacion = props.graduacion;
  const item:GraficaItemSimple = props.item;
  const totalItems:number = props.totalItems;
  const posicion:number = props.posicion;
  const espacio = 850/totalItems;
  const ancho = espacio/3;
  const alto = item.Valor*(475/(graduacion.Max-graduacion.Min));
  const Xn = 100 + (espacio*posicion) + ancho;
  const Yn = 525 - alto;
  return <Barra x={Xn} y={Yn} width={ancho} height={alto} fill={item.Color} {...item} />
}

function CrearGrupoBarras(props:any){
  const graduacion:GraficaBarrasGraduacion = props.graduacion;
  const item:GraficaBarrasItemChildrens = props.item;
  const totalItems:number = props.totalItems;
  const posicion:number = props.posicion;
  const totalChildrens = item.Childrens.length;
  const espacio = 850/totalItems;
  const ancho = espacio/(totalChildrens+2);
  return (
    <>
      {item.Childrens.map((item, i) =>{
        const alto = item.Valor*(475/(graduacion.Max-graduacion.Min));
        const Xn = 100 + (espacio*posicion) + (ancho*(i+1)) + 3;
        const Yn = 525 - alto;
        return <Barra x={Xn} y={Yn} width={ancho-6} height={alto} fill={item.Color} {...item} />
      })}
    </>
  );
}

function Barra(props:any){
  const Xn:number = props.x + (props.width-10);
  const titulo:string = props.Titulo;
  const valor:number= props.Valor;
  const [hover, setHover] = React.useState(false);
  return (
    <>
      <rect className="grafica-barras-item-barra"
        x={props.x} y={props.y} width={props.width} height={props.height} fill={props.fill}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      />
      {hover && <BarraTooltip x={Xn} y={props.y} titulo={titulo} valor={valor} />}
    </>
  );
}

function BarraTooltip(props:any){
  const Xn:number = props.x;
  const Yn:number = props.y;
  const titulo:string = props.titulo;
  const valor:number= props.valor;
  const textMaxWidth:number = 14*Math.max(titulo.length,valor.toString().length);
  return (
    <>
      <path fill={"rgba(0, 0, 0, 0.9)"}
        d={
          "M " + Xn + " " + Yn + " " +
          "L " + (Xn+10) + " " + (Yn-10) + " " +
          "L " + (Xn+10) + " " + (Yn+10) + " Z"
        }
      />
      <rect x={Xn+10} y={Yn-50} width={textMaxWidth} height={100} rx={20} fill={"rgba(0, 0, 0, 0.9)"} />
      <text x={Xn+25} y={Yn-25} fill={"white"} style={textStyle} >{titulo}</text>
      <text x={Xn+25} y={Yn} fill={"white"} style={textStyle} >{valor}</text>
    </>
  );
}
