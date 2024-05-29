import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { useLocalStorage } from "./localstorage";
import { MatrixContext } from '../ui/context';
import './tabla.css';

const Tabla = (props) => {
  let varia = parseInt(props.variables) + 2;
  let what = parseInt(props.restricciones) + 1;
  const [variablesRestricciones, setVariablesRestricciones] = useLocalStorage('variablesRestricciones',Array.from({ length: what }, () => Array.from({ length: varia }, () => '')));
  
  const { setMatrix } = useContext(MatrixContext);

  useEffect(() => {
    console.log(variablesRestricciones[0].length)
    console.log(varia)
    if (variablesRestricciones.length != what || variablesRestricciones[0].length != varia){
      setVariablesRestricciones(Array.from ({ length: what }, () => Array.from({ length: varia }, () => '')));
    }
    setMatrix(variablesRestricciones)
  }, [props.variables, props.restricciones]);

  const handleVariableChange = (rowIndex, colIndex, event) => {
    const newVariablesRestricciones = [...variablesRestricciones];
    newVariablesRestricciones[rowIndex][colIndex] = event.target.value;
    newVariablesRestricciones[0][varia - 1] = 0;
    newVariablesRestricciones[0][varia - 2] = '=';
    setVariablesRestricciones(newVariablesRestricciones);
    setMatrix(newVariablesRestricciones);
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
              </h1 >
              <div  >
                {variablesRestriccion.map((variable, colIndex) => (
                  <div key={colIndex} className="cajitas">
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
    </div>
  );
};

export default Tabla;
