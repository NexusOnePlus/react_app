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
  console.log(nuevo);
  let holguras = nuevo.length;
  
  // let identidad = Array.from({ length: holguras }, () => Array.from({ length: holguras }, () => 0));
  let identidad = Array.from({ length: holguras }, (_, i) => 
    Array.from({ length: holguras - 1}, (_, j) => i === 0 ? 0 :(i-1 === j ? 1 : 0))
  );
  console.log(identidad)
  let nuevoConIdentidad = nuevo.map((fila, i) => fila.concat(identidad[i]));
  console.log(holguras)
  nuevo.map((row, rowIndex) => {
    row.map((cell, cellIndex) => {
      if (cell !== 0) {
      }
    });
  })
  return [nuevoConIdentidad, matrix];
};

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
    setNuevo(newMatrix);
  };

  useEffect(() => {
    if (matrix.length > 0) {
      modifyMatrix(matrix);
    }
  }, [matrix]);

  useEffect(() => {
    if (nuevo.length > 0 && signos.length > 0) {
      setMatrices(operaciones(nuevo, signos, matrix));
    }
  }, [nuevo, signos, matrix]);

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
