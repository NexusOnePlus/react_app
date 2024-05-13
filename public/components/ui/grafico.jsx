import React from 'react'
import './grafico.css'
import "mafs/core.css";
import "mafs/font.css";

import { Mafs, Coordinates, Text, Plot, Theme } from "mafs";


function InequalityExample() {
  return (
    <Mafs height={300}
      zoom={true}>
      <Coordinates.Cartesian />
      <Plot.Inequality
        x={({ "<=": ( y) => (3 - 3 * y + 2*y),
        ">": (y) => Math.sin(y - y) + y,

        })}// Aquí convertimos la ecuación a una función de y
        color={Theme.blue}
      />
    </Mafs>
  )
}


const Grafico = () => {
  return (
    <div className='grafico'>
      <h1 className='titulograf'>GRAFICO</h1>
      <div className='aqui'>
        {InequalityExample()}
      </div>
    </div>
  )
}

export default Grafico;
