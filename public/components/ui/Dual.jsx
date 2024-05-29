import React, { useContext, useState, useEffect } from 'react';
import './proceso.css';
import { MatrixContext } from '../ui/context';

// Componente Tablitas
const Tablitas = ({ matrix }) => {
  return (
    <div className="nomatrices">
      {matrix.map((row, rowIndex) => (
        <div className='matrix-table' key={rowIndex}>
          {row.map((cell, cellIndex) => (
            <span className="cell" key={cellIndex}>{cell}</span>
          ))}
        </div>
      ))}
    </div>
  );
};

// Función operacionesDual
const operacionesDual = (nuevo, signos, matrix) => {
  const pasos = [];
  let holguras = nuevo.length;

  let identidad = Array.from({ length: holguras }, (_, i) =>
    Array.from({ length: holguras - 1 }, (_, j) => i === 0 ? 0 : (i - 1 === j ? 1 : 0))
  );

  let nuevoConIdentidad = nuevo.map((fila, i) => {
    let colita = fila[fila.length - 1];
    let nuevafila = fila.slice(0, -1).concat(identidad[i]).concat(colita);
    return nuevafila;
  });

  let negativos = true;

  while (negativos) {
    let pivote, pivot;

    // Selección de la fila pivote
    for (let i = 1, valor = Infinity; i < nuevoConIdentidad.length; i++) {
      if (nuevoConIdentidad[i][nuevoConIdentidad[i].length - 1] < valor && nuevoConIdentidad[i][nuevoConIdentidad[i].length - 1] < 0) {
        valor = nuevoConIdentidad[i][nuevoConIdentidad[i].length - 1];
        pivot = i;
      }
    }

    if (pivot === undefined) {
      break;
    } else {
      // Selección de la columna pivote
      for (let j = 0, i = pivot, valor = Infinity; j < nuevoConIdentidad[i].length - 1; j++) {
        let coeficiente = nuevoConIdentidad[0][j];
        if (nuevoConIdentidad[i][j] < 0) {
          let ratio = coeficiente / Math.abs(nuevoConIdentidad[i][j]);
          if (ratio < valor) {
            valor = ratio;
            pivote = j;
          }
        }
      }
      if (pivote !== undefined) {
        let realpivot = [...nuevoConIdentidad[pivot]];
        nuevoConIdentidad[pivot] = nuevoConIdentidad[pivot].map(cell => parseFloat((cell / realpivot[pivote]).toFixed(2)));
        pasos.push(structuredClone(nuevoConIdentidad));

        realpivot = [...nuevoConIdentidad[pivot]];
        for (let i = 0; i < nuevoConIdentidad.length; i++) {
          if (i !== pivot) {
            let coef = nuevoConIdentidad[i][pivote];
            for (let j = 0; j < nuevoConIdentidad[i].length; j++) {
              nuevoConIdentidad[i][j] -= coef * realpivot[j];
              nuevoConIdentidad[i][j] = nuevoConIdentidad[i][j].toFixed(2);
            }
          }
        }
        pasos.push(structuredClone(nuevoConIdentidad));
      } else {
        negativos = false;
      }
    }
  }

  pasos.push(matrix);
  return pasos;
};

// Componente Proceso
const Proceso = () => {
  const { matrix } = useContext(MatrixContext);
  const [nuevo, setNuevo] = useState([]);
  const [matrices, setMatrices] = useState([]);
  const [signos, setSignos] = useState([]);

  const modificarMatriz = (matrix) => {
    const nuevaMatriz = [];
    const nuevosSignos = [];

    matrix.forEach(fila => {
      const nuevaFila = fila.slice(0, -2).concat(fila.slice(-1)).map(celda => {
        const parsed = parseInt(celda, 10);
        return isNaN(parsed) ? 0 : parsed;
      });
      nuevaMatriz.push(nuevaFila);
      nuevosSignos.push(fila[fila.length - 2]);
    });

    setSignos(nuevosSignos);
    setNuevo(nuevaMatriz);
  };

  useEffect(() => {
    if (matrix.length > 0) {
      modificarMatriz(matrix);
    }
  }, [matrix]);

  useEffect(() => {
    if (nuevo.length > 0 && signos.length > 0) {
      setMatrices(operacionesDual(nuevo, signos, matrix));
    }
  }, [nuevo, signos, matrix]);

  return (
    <div className="proceso">
      <h1 className="titu">SOLUCIÓN DUAL</h1>
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