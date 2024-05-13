import React, { useState } from 'react'
import Tabla from './tabla';
import './espacios.css'

const Espacios = () => {
    const [inputs, setInputs] = useState({ variables: '', restricciones: '' });
    const handleChange = (event) => {
        const { name, value } = event.target;
        setInputs(prevInputs => ({
            ...prevInputs,
            [name]: value
        }));
    };
    return (
        <div className="mayor">
            <div className="ayuda">
                <form onSubmit={ev => {
                    ev.preventDefault();
                }}>
                    <h1 className='title'>SETUP </h1>
                    <div className='cajas'>
                        <h1 className='sub'> N° de variables</h1>
                        <div className='input-box'>
                            <input
                                type="text"
                                placeholder="X1,X2,X 3"
                                name='variables'
                                value={inputs.variables}
                                onChange={handleChange}
                            />
                        </div>
                    </div >
                    <div className='cajas'>
                        <h1 className='sub'> N° de restricciones</h1>
                        <div className='input-box'>
                            <input type="text" placeholder=">=, <=, =" name='restricciones'
                                value={inputs.restricciones}
                                onChange={handleChange}
                            />
                        </div>  </div>

                    <button type='submit'> Modelar </button>
                </form>
            </div >
            <div className='segunda'>
                <Tabla variables={inputs.variables} restricciones={inputs.restricciones} />
                
            </div>
        </div >
    );
};
export default Espacios
