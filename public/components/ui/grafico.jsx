import React from 'react'
import './grafico.css'
import "mafs/core.css";
import "mafs/font.css";

import { Mafs, Coordinates, Text, Plot, Theme } from "mafs";


function InequalityExample(matriz) {
  console.log(matriz)
  if (!matriz || !matriz[0] || matriz[0].length === 0) {
    console.error("La matriz está vacía o el primer elemento no está definido")
    return (
      <Mafs height={300}
        zoom={true}>
        <Coordinates.Cartesian />
      </Mafs>
    )
  }
  // a = matriz[0][0]
  return (
    <Mafs height={300}
      zoom={true}>
      <Coordinates.Cartesian />
      <Plot.Inequality
        y={({ "<=": (x,y) => (12 - 3*x)/2,
        "<=": (x) => (8 - x)/2,
        ">=": 0,
        })}
        color={Theme.blue}
      />
    

    </Mafs>
  )
}


const Grafico = (props) => {
  let matriz = props.matriz;
  return (
    <div className='grafico'>
      <h1 className='titulograf'>GRAFICO</h1>
      <div className='aqui'>
        {InequalityExample(matriz)}
      </div>
    </div>
  )
}

export default Grafico;
