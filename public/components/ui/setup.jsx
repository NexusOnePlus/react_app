import React from 'react'
import Planteamiento from './planteamiento';
import { useLocalStorage } from "../context/localstorage";
import './setup.css'

const Setup = () => {
    const [variables, setVariables] = useLocalStorage('variables', 2)
    const [restricciones, setRestricciones] = useLocalStorage('restricciones', 2)
    const [min, setMin] = useLocalStorage("min", false)


    const handleVariables = (value) => {
        if (variables + value >= 2) {
            setVariables(variables + value);
        }
    };
    const handleRestricciones = (value) => {
        if (restricciones + value >= 2) {
            setRestricciones(restricciones + value);
        }
    };
    const handleSwitch = () => {
        setMin(!min)
        // console.log(min)
    }
    return (
        <div className="entorno">
            <div className="setup">
                <h1 className='title'>SETUP </h1>
                <div className='cajas'>
                    <h1 className='sub'> N° de variables</h1>
                    <div className='input-box'>
                        <h1 className='count'>{variables}</h1>
                        <div className='botones'>
                            <button onClick={() => handleVariables(-1)}>-</button>
                            <button onClick={() => handleVariables(1)}>+</button>
                        </div>
                    </div>
                </div >
                <div className='cajas'>
                    <h1 className='sub'> N° de restricciones</h1>
                    <div className='input-box'>
                        <h1 className='count'>{restricciones}</h1>
                        <div className='botones'>
                            <button onClick={() => handleRestricciones(-1)}>-</button>
                            <button onClick={() => handleRestricciones(1)}>+</button>
                        </div>
                    </div>
                </div>
                <div className='toggle'>
                    <h1 className={min ? '' : 'neon'}> Max </h1>
                    <div className='type'>
                        <label className='switch'>
                            <input type='checkbox' checked={min} onChange={() => handleSwitch()} />
                            <span className='slider' />
                        </label>
                    </div>
                    <h1 className={min ? 'neon' : ''}> Min </h1>
                </div>

            </div>
            <Planteamiento variables={variables} restricciones={restricciones} tipo={min} />
        </div>
    );
};
export default Setup
