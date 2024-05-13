import { useState, useEffect } from 'react';
import React from 'react';
import './tabla.css';
import Grafico from './grafico';

const Tabla = (props) => {
  let varia = parseInt(props.variables) + 2;
  let what = parseInt(props.restricciones) + 1;
  // const [funcionObjetivo, setFuncionObjetivo] = useState('');
  const [variablesRestricciones, setVariablesRestricciones] = useState([]);

  useEffect(() => {
    setVariablesRestricciones(Array.from({ length: what }, () => Array.from({ length: varia }, () => '')));
  }, [props.variables, props.restricciones]);

  // const handleFuncionObjetivoChange = (event) => {
  //   setFuncionObjetivo(event.target.value);
  // };

  const handleVariableChange = (rowIndex, colIndex, event) => {
    const newVariablesRestricciones = [...variablesRestricciones];
    newVariablesRestricciones[rowIndex][colIndex] = event.target.value;
    setVariablesRestricciones(newVariablesRestricciones);
  };

  return (
    <div className='tab'>
      <div className='Tabla'>
        <h1 className="xd"> PLANTEAMIENTO </h1>
        <div>
          {/* <div className='cajas'>
            <h1 className='sub2'> Funcion Objetivo</h1>
            <div className='input-box'>
              <input
                type="text"
                placeholder="Z = X1 + X2"
                value={funcionObjetivo}
                onChange={handleFuncionObjetivoChange}
              />
            </div>
          </div> */}

          {variablesRestricciones.map((variablesRestriccion, rowIndex) => (
            <div className="input-what" key={rowIndex}>
              <h1 className='sub2'>
                {rowIndex === 0 ? "Funcion Objetiva" : `Restriccion ${rowIndex}`}
              </h1 >
              <div  >
                {variablesRestriccion.map((variable, colIndex) => (
                  <div className="cajitas">
                     <span className="input-title">
                      {colIndex === variablesRestriccion.length - 1 ? "Valor: " : (colIndex === variablesRestriccion.length - 2 ? "Signo:" : `X${colIndex + 1}: `)}
                    </span>
                    <input
                      key={colIndex}
                      type="text"
                      placeholder='_____________________'
                      // placeholder={colIndex === variablesRestriccion.length - 1 ? "Valor" : (colIndex === variablesRestriccion.length - 2 ? "<=,>=,=" : `X${colIndex + 1}`)}
                      value={variable}
                      onChange={(e) => handleVariableChange(rowIndex, colIndex, e)}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <Grafico />
      </div>
    </div>
  );
};

export default Tabla;
