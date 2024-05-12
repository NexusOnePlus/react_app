import React from 'react'
import './grafico.css'
import "mafs/core.css";
import "mafs/font.css";

import { Mafs, Coordinates, Text } from "mafs";


function Example() {
  return (
    <Mafs
      height={300}
      zoom={true}
    >
      <Coordinates.Cartesian />
    </Mafs>
  )
}



const Grafico = () => {
  return (
    <div className='grafico'>
      <h1 className='titulograf'>GRAFICO</h1>
      <div className='aqui'>
        {Example()}
      </div>
    </div>
  )
}

export default Grafico;
