import React, { useContext, useState, useEffect } from 'react';
import './proceso.css';
import { MatrixContext } from '../ui/context';

const Tablitas = ({ matrix }) => {
  return (
    <div className="nomatrices">
      {matrix.map((row, rowIndex) => (
        <div className='matrix-table' key={rowIndex}>
          {row.map((cell, cellIndex) => (
            <span className="cell" key={cellIndex}>{cell} </span>
          ))}
        </div>
      ))}
    </div>
  );
};

const operaciones = (nuevo, signos, matrix) => {
  const pasos = [];
  console.log(nuevo)
  return [matrix];
}

const Proceso = () => {
  const { matrix } = useContext(MatrixContext);
  const [nuevo, setNuevo] = useState([]);
  const [matrices, setMatrices] = useState([]);
  const [signos, setSignos] = useState([]);

  const modifyMatrix = (matrix) => {
    const newMatrix = [];
    const newSignos = [];
    
    matrix.forEach(row => {
      const newRow = row.slice(0, -2).concat(row.slice(-1)).map(cell => {
        const parsed = parseInt(cell, 10);
        return isNaN(parsed) ?  0 : parsed;
      });
      newMatrix.push(newRow);
      newSignos.push(row[row.length - 2]); 
    });
  
    setSignos(newSignos);
    return newMatrix;
  };
  

  useEffect(() => {
    if (matrix.length > 0) {
      const modifiedMatrix =  modifyMatrix(matrix);
      // setMatrices([modifiedMatrix, ...matrices]);
      setNuevo(modifiedMatrix);
      setMatrices(operaciones(nuevo, signos, matrix));
    }
  }, [matrix]);

  return (
    <div className="proceso">
      <h1 className="titu">SOLUCION</h1>
      <div className="matrices">
        {matrices.length > 0 ? (
          matrices.map((mat, index) => (
            <div key={index}>
              <h3 className="subtitu">Paso {index + 1}</h3>
              <Tablitas matrix={mat} />
            </div>
          ))
        ) : (
          <h3 className="error">DATA NO ENCONTRADA</h3>
        )}
      </div>
    </div>
  );
};

export default Proceso;
