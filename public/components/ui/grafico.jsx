import React, { useContext, useState, useEffect } from 'react';
import './grafico.css'
import { MatrixContext } from '../ui/context';
import functionPlot from "function-plot";

function parseExpression([operand1, operand2, operator, result]) {
  // Rellenar con 0 si faltan valores
  operand1 = operand1 || '0';
  operand2 = operand2 || '0';
  result = result || '0';

  let signos = ['<=','<','>','>=']
  // Construir la expresión
  if (signos.includes(operator)) {
    return `(${result} - ${operand1} * x) / ${operand2}`; // Expresión para inecuación
  } else {  
    return null; // Ignorar si no hay un operador válido
  }
}


function trazando(matriz) {
  console.log(matriz)
  let funciones = matriz.map(parseExpression).filter(Boolean)
  console.log(funciones)
  const data = funciones.map((fn) => ({ 
    fn
  }))
  /*
  0: (4) ['2', '32', '=', 0]
  1: (4) ['2', '2', '<=', '4']
  2: (4) ['24', '24', '<=', '420']
  */
  
  
  functionPlot({
    target: '#aqui',
    // grid: true,
    data
  })
}


const Grafico = () => {
  const { matrix } = useContext(MatrixContext);
  useEffect(() => {trazando(matrix)}, [matrix]);
  return (
    <div className='grafico'>
      <h1 className='titulograf'>GRAFICO</h1>
      <div id='aqui'>
      </div>
    </div>
  )
}

export default Grafico;
