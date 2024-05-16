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

const Proceso = () => {
  const { matrix } = useContext(MatrixContext);
  const [matrices, setMatrices] = useState([]);
  const [signos, setSignos] = useState([]);

  const modifyMatrix = (matrix) => {
    const newMatrix = [];
    const newSignos = [];
    matrix.forEach(row => {
      const newRow = row.slice(0, -1).map(cell => {
        const parsed = parseInt(cell, 10);
        return isNaN(parsed) ? cell : parsed;
      });
      newMatrix.push(newRow);
      newSignos.push(row[row.length - 2]); 
    });
    setSignos(newSignos);
    return newMatrix;
  };

  useEffect(() => {
    if (matrix.length > 0) {
      const modifiedMatrix = modifyMatrix(matrix);
      setMatrices([modifiedMatrix, ...matrices]);
    }
  }, [matrix]);

  return (
    <div className="proceso">
      <h1 className="titu">SOLUCION</h1>
      <div className="matrices">
        {matrices.length > 0 ? (
          matrices.map((mat, index) => (
            <div key={index}>
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
