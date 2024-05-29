import React, { useContext, useState, useEffect } from 'react';
import './proceso.css';
import { MatrixContext } from '../ui/context';

const Tablitas = ({ matrix }) => {
  return (
    <div className="nomatrices">
      {matrix.map((row, rowIndex) => (
        <div className='matrix-table' key={rowIndex}>
          {row.map((cell, cellIndex) => (
            <span className="cell" key={cellIndex}>{cell } </span>
          ))}
        </div>
      ))}
    </div>
  );
};

const operaciones = (nuevo, signos, matrix) => {
  const pasos = [];
  let holguras = nuevo.length;

  // let identidad = Array.from({ length: holguras }, () => Array.from({ length: holguras }, () => 0));
  let identidad = Array.from({ length: holguras }, (_, i) =>
    Array.from({ length: holguras - 1 }, (_, j) => i === 0 ? 0 : (i - 1 === j ? 1 : 0))
  );
  let nuevoConIdentidad = nuevo.map((fila, i) => {
    let colita = fila[fila.length - 1];
    // console.log("colita", colita)
    let nuevafila = fila.slice(0, -1);
    nuevafila = nuevafila.concat(identidad[i]);
    nuevafila.push(colita)
    return nuevafila;
  });
  let negativos = true;
  while (negativos) {
    let pivote, pivot;
    //eligiendo columna pivote
    for (let j = 0, i = 0, valor = Infinity; j < nuevoConIdentidad[i].length; j++) {
      if (nuevoConIdentidad[i][j] < valor && nuevoConIdentidad[i][j] < 0) {
        valor = nuevoConIdentidad[i][j];
        pivote = j;
      }
    }
    if (pivote == undefined) {
      break
    } else {
      //eligiendo fila pivote
      console.log("BUSCANDO columna")
      console.log(nuevoConIdentidad)
      for (let i = 1, j = pivote, valor = Infinity; i < nuevoConIdentidad.length; i++) {
        console.log("ite", i, "i", j, "j", "valor actual", nuevoConIdentidad[i][j])
        console.log("division", nuevoConIdentidad[i][nuevoConIdentidad[i].length - 1]/nuevoConIdentidad[i][j])
        console.log("valor", valor)
        console.log("valor", nuevoConIdentidad[i][nuevoConIdentidad[i].length - 1])
        if ((nuevoConIdentidad[i][nuevoConIdentidad[i].length - 1] / nuevoConIdentidad[i][j]) < valor && nuevoConIdentidad[i][j] != 0) {
          valor = (nuevoConIdentidad[i][nuevoConIdentidad[i].length - 1]/nuevoConIdentidad[i][j]);
          valor = valor.toFixed(2);
          pivot = i;
        }
      }
      if (pivot != undefined) {
        let realpivot = [...nuevoConIdentidad[pivot]];
        // reduciendo a 1 la fila pivot
        for (let i = 0; i < nuevoConIdentidad[pivot].length; i++) {
          nuevoConIdentidad[pivot][i] = (nuevoConIdentidad[pivot][i] / realpivot[pivote]);
          nuevoConIdentidad[pivot][i] = nuevoConIdentidad[pivot][i].toFixed(2);
        }
        pasos.push(structuredClone(nuevoConIdentidad));

        // restaurando cambios a la copia de fila pivot
        realpivot = [...nuevoConIdentidad[pivot]];
        // transformando a 0 la fila z
        let sumaresta = nuevoConIdentidad[0][pivote] * -1;
        for (let i = 0; i < nuevoConIdentidad[0].length; i++) {
          nuevoConIdentidad[0][i] = nuevoConIdentidad[0][i] + (realpivot[i] * (sumaresta));
        }
        pasos.push(structuredClone(nuevoConIdentidad));
        // limpiando la columna pivote
        for (let i = 1; i < nuevoConIdentidad.length; i++) {
          let a = nuevoConIdentidad[i][pivote];
          if (i != pivot && nuevoConIdentidad[i][pivote] != 0) {
            for (let j = 0; j < nuevoConIdentidad[i].length; j++) {
              // console.log("resta", nuevoConIdentidad[i][j], "xd", realpivot[j] * a)
              nuevoConIdentidad[i][j] = nuevoConIdentidad[i][j] - (realpivot[j] * a);
            }
          }
        }
        pasos.push(structuredClone(nuevoConIdentidad));
      }else {
        negativos = false
      }
      // pasos.push(structuredClone(nuevoConIdentidad));
    } 
  }

  pasos.push(matrix);
  return pasos;
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
        return isNaN(parsed) ? 0 : parsed;
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
      <h1 className="titu">SOLUCION SIMPLEX</h1>
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
