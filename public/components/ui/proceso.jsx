import React, { useContext, useState, useEffect } from 'react';
import './proceso.css';
import { MatrixContext } from '../ui/context';

const tablitas = (props) => {
  return (
    <h1> Tablas </h1>
  )
}


const Proceso = () => {
  const { matrix } = useContext(MatrixContext); 
  const [nuevo, setNuevo] = useState([]);

  useEffect(() => {
    setNuevo(matrix);
  }, [matrix]);
  return (
    <div className="proceso">
      <h1 className="titu">SOLUCION</h1>
      <div className="matrices">
        {nuevo.length > 0 && nuevo[0].length > 0 ? tablitas(nuevo) : (<h3 className='error'> DATA NO ENCONTRADA</h3>)}
      </div>
    </div>
  );
};

export default Proceso;
