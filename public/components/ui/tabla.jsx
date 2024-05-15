import { useState, useEffect } from 'react';
import React from 'react';
import './tabla.css';
import Grafico from './grafico';

const Tabla = (props) => {
  let varia = parseInt(props.variables) + 2;
  let what = parseInt(props.restricciones) + 1;
  const [variablesRestricciones, setVariablesRestricciones] = useState([]);

  useEffect(() => {
    setVariablesRestricciones(Array.from({ length: what }, () => Array.from({ length: varia }, () => '')));
  }, [props.variables, props.restricciones]);

  const handleVariableChange = (rowIndex, colIndex, event) => {
    const newVariablesRestricciones = [...variablesRestricciones];
    newVariablesRestricciones[rowIndex][colIndex] = event.target.value;
    setVariablesRestricciones(newVariablesRestricciones);
  };

  return (
    <div className='tab'>
      <div className='Tabla'>
        <h1 className="xd"> PLANTEAMIENTO </h1>
        <div className='tablitas'>
          {variablesRestricciones.map((variablesRestriccion, rowIndex) => (
            <div className="input-what" key={rowIndex}>
              <h1 className='sub2'>
                {rowIndex === 0 ? "Funcion Objetiva (Z ... = 0)" : `Restriccion ${rowIndex}`}
                {/* {rowIndex === 0 ? (<h6>En funcion a Z ... = 0</h6>) : null} */}
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
                      value={rowIndex === 0 && colIndex === variablesRestriccion.length - 2 ? '=' : (rowIndex === 0 && colIndex === variablesRestriccion.length - 1 ? '0' : variable)}
                      onChange={(e) => handleVariableChange(rowIndex, colIndex, e)}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* <div>{
        varia === 4 ? <Grafico matriz={variablesRestricciones} /> : ''  
      }
      </div> */}
    </div>
  );
};

export default Tabla;
