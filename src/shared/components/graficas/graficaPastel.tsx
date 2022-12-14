import * as React from 'react';
import { Grid } from '@mui/material';
import { Alineacion, GraficaItemSimple, GraficaPastelType } from '@shared/types';

const itemPastelStyle:React.CSSProperties = {
  width: "100%",
  padding: "10%",
  position: "absolute"
};

export function GraficaPastel(props:any) {
  const data:GraficaPastelType = props.data;
  if(!data){
    return <></>;
  }
  let Total:number = 0;
  let Rotaciones:number[] = [0];
  data.Items.forEach(element => {
    Total += element.Valor;
  });
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        {data.Header && data.Header}
      </Grid>
      {data.Alineacion == Alineacion.Izquierda &&
        <LeyendasGraficaPastel data={data} />
      }
      <Grid item xs={8}>
        <div style={{position:"relative"}}>
          {data.Items.map((item, i)=>{
            const angulo:number = (item.Valor/Total)*360;
            const giro:number = angulo+Rotaciones[i];
            Rotaciones.push(giro);
            return (
              <ItemGraficaPastel key={i} angulo={angulo} rotacion={Rotaciones[i]} item={item} />
            );
          })}
        </div>
      </Grid>
      {data.Alineacion == Alineacion.Derecha &&
        <LeyendasGraficaPastel data={data} />
      }
      <Grid item xs={12}>
        {data.Footer && data.Footer}
      </Grid>
    </Grid>
  );
}

function ItemGraficaPastel(props:any){
  const angulo:number = props.angulo;
  const rotacion:number = props.rotacion;
  const item:GraficaItemSimple = props.item;
  const rad:number = (Math.PI/180)*(angulo/2)
  const Xn:number = 200*Math.sin(rad)*Math.sin((Math.PI/2)-rad);
  const Yn:number = 200*Math.sin(rad)*Math.cos((Math.PI/2)-rad);
  return (
    <svg viewBox='0 0 200 200'
      style={{...itemPastelStyle, rotate: (angulo>180 ? rotacion-360+angulo : rotacion) + "deg"}}>
        <path fill={item.Color}
          d={
            "M 100 0 " +
            "A 100 100, 0, " + (angulo>180 ? "1, 0, " : "0, 1, ") +
            (angulo>180 ? 100-Xn : Xn+100) + " " + Yn + " " +
            "L 100 100 Z"
          }
        />
    </svg>
  );
}

function LeyendasGraficaPastel(props:any){
  const data:GraficaPastelType = props.data;
  return (
    <Grid item xs={4}>
      <ul style={{listStyle:"none"}}>
        {data.Items.map((item, i) =>
          <li key={i}>
            <span style={{color:item.Color, fontSize:"35px"}}>■</span> {item.Titulo}
          </li>
        )}
      </ul>
    </Grid>
  );
}
