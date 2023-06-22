import * as React from 'react';
import { Grid } from '@mui/material';
import { Alineacion, GraficaItemSimple, GraficaPastelType } from '@shared/types';

const itemPastelStyle:React.CSSProperties = {
  width: "100%",
  padding: "10%",
  position: "absolute",
  overflow: "visible"
};

export function GraficaPastel(props:any) {
  const data:GraficaPastelType = props.data;
  if(!data){
    return <></>;
  }
  const prev = data.Alineacion == Alineacion.Arriba || data.Alineacion == Alineacion.Izquierda;
  const colBool = data.Alineacion == Alineacion.Arriba || data.Alineacion == Alineacion.Abajo;
  let Total:number = 0;
  let Rotaciones:number[] = [0];
  data.Items.forEach(element => {
    Total += element.Valor;
  });
  if(Total <= 0){
    return(
      <Grid container spacing={2}>
        <Grid item xs={12} style={{textAlign:"center"}}>
          {data.NoData || "No hay datos suficientes para presentar el grafico" }
        </Grid>
      </Grid>
    );
  }
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        {data.Header && data.Header}
      </Grid>
      {prev &&
        <LeyendasGraficaPastel data={data} colbool={colBool} />
      }
      <Grid item xs={colBool ? 12 : 8}>
        <div style={{position:"relative", aspectRatio:"1"}}>
          {data.Items.sort((a, b) => b.Valor-a.Valor).map((item, i)=>{
            const angulo:number = (item.Valor/Total)*360;
            const giro:number = angulo+Rotaciones[i];
            Rotaciones.push(giro);
            return (
              <ItemGraficaPastel
                key={i}
                angulo={angulo}
                rotacion={Rotaciones[i]}
                item={item}
                total={Total}
                porcentajes={data.Porcentajes}
              />
            );
          })}
        </div>
      </Grid>
      {!prev &&
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
  const total:number = props.total;
  const porcentajes:boolean = props.porcentajes;
  const Coor = getXY(angulo, rotacion);
  return (
    <svg viewBox='0 0 200 200'
      style={{...itemPastelStyle}}>
        {angulo == 360
          ?
          <circle cx="100" cy="100" r="100" fill={item.Color} />
          :
          <path fill={item.Color}
            d={
              "M " + Coor.Xi + " " + Coor.Yi + " " + "A 100 100, 0, " +
              Coor.arco + Coor.Xf + " " + Coor.Yf + " " + "L 100 100 Z"
            }
          />
        }
        {porcentajes &&
          <>
            <path stroke="black" style={{position:"relative"}}
              d={
                "M " + Coor.Xm(1) + " " + Coor.Ym + " " + "L " +
                Coor.Xm(8/7) + " " + ((8*Coor.Ym-100)/7) + " Z"
              }
            />
            <text
              style={{ fontSize:"11px" }}
              x={Coor.Xm(7/6) - (Coor.Xm(7/6)<100 ? 31 : 0)}
              y={((7*Coor.Ym-100)/6)*32/31}>
              {(100*item.Valor/total).toFixed(1)}%
            </text>
          </>
        }
    </svg>
  );
}

function getXY(ang:number, rot:number){
  const radI:number = (Math.PI/180)*(rot/2);
  const radF:number = (Math.PI/180)*((rot+ang)/2);
  const radM:number = (Math.PI/180)*((rot+(ang/2))/2);
  return {
    Xi: 100-(ang>180 ? 200 : -200)*Math.sin(radI)*Math.sin((Math.PI/2)-radI),
    Yi: 200*Math.sin(radI)*Math.cos((Math.PI/2)-radI),
    Xm: (i:number) => 100+200*i*Math.sin(radM)*Math.sin((Math.PI/2)-radM),
    Ym: 200*Math.sin(radM)*Math.cos((Math.PI/2)-radM),
    Xf: 100+200*Math.sin(radF)*Math.sin((Math.PI/2)-radF),
    Yf: 200*Math.sin(radF)*Math.cos((Math.PI/2)-radF),
    arco: ang>180 ? "1, 1, " : "0, 1, "
  };
}

function LeyendasGraficaPastel(props:any){
  const data:GraficaPastelType = props.data;
  const colBool:Boolean = props.colbool;
  return (
    <Grid item xs={colBool ? 12 : 4}>
      <ul id={"grafica-pastel-leyendas" + (colBool ? "-col2" : "")}>
        {data.Items.map((item, i) =>
          <li key={i}>
            <span style={{color:item.Color, fontSize:"35px"}}>■</span> {item.Titulo}
          </li>
        )}
      </ul>
    </Grid>
  );
}
