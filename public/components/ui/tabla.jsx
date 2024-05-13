import { useState, useEffect } from 'react';
import React from 'react'
import './tabla.css'
import Grafico from './grafico';


const Tabla = (props) => {
  let variables = props.variables;
  let restricciones = props.restricciones;
  const [inputFields, setInputFields] = useState([]);

  useEffect(() => {
    setInputFields(Array.from({ length: restricciones }, () => ({ value: '' })));
  }, [restricciones]);

  // Function to update the value of an input field
  const handleValueChange = (index, event) => {
    const values = [...inputFields];
    values[index].value = event.target.value;
    setInputFields(values);
  };
  const [inputs, setInputs] = useState({ objetivo: '' });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs(prevInputs => ({
      ...prevInputs,
      [name]: value
    }));
  };
  return (
    <div className='tab'>
      <div className='Tabla'>
        <h1 className="xd"> PLANTEAMIENTO </h1>
        <div>
          <div className='cajas'>
            <h1 className='sub2'> Funcion Objetivo</h1>
            <div className='input-box'>
              <input
                type="text"
                placeholder="Z = X1 + X2"
                name='objetivo'
                value={inputs.objetivo}
                onChange={handleChange}
              />
            </div>
          </div>

          {
            inputFields.map((inputField, index) => (
              <div className="input-what" key={index}>
                <h1 className='sub2'> Restriccion {index + 1} </h1>
                <input
                  type="text"
                  placeholder="X1 + X2 >= N"
                  value={inputField.value}
                  onChange={(e) => handleValueChange(index, e)}
                />
              </div>
            ))}

        </div>
      </div>
      <div>
        <Grafico />
      </div>
    </div>
  )
}

export default Tabla