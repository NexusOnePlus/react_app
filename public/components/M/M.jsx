import React, { useContext, useState, useEffect } from 'react';
import { MatrixContext } from '../context/context';
import './m.css';

// Componente Tablitas
const Tablitas = ({ matrix }) => {
  return (
    <div className="pasos">
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


const operacionesGranM = (nuevo, signos, matrix) => {
  let pasos = [];
  const M = 1000;
  const ismax = true; 
  let numFilas = nuevo.length;
  let numSignosIgual=0;
  let numSignosMayor=0;
  
  signos.slice(1).forEach((signo)=>{ 
    if(signo==='=') numSignosIgual++;
    if(signo==='>=') numSignosMayor++;
  });
  // Creando matriz variables de holgura
  let matVHolgura = Array.from({ length: numFilas }, (_, i) =>
    Array.from({ length: numFilas - 1 - numSignosIgual }, (_, j) => {
        if(i===0) return 0;
        if (i - 1 === j && signos[i]=='<=')
            return 1;
        else if (i - 1 === j && signos[i]=='>=')
            return -1;
        return 0;
    })
  );
  
 // Creando matriz variables artificiales
 let matVArtificial = Array(numFilas).fill().map(() => Array(numSignosIgual + numSignosMayor).fill(0));
 let indexVA = 0;
 for (let i = 1; i <= numFilas-1; i++) {
    if (signos[i] == ">=" || signos[i] == "=") {
        matVArtificial[0][indexVA] =  ismax? M : -M;
        matVArtificial[i][indexVA] = 1;
        indexVA++;
    }
  }

  let matriz = nuevo.map((fila, i) => {
    let colita = fila[fila.length - 1];
    let nuevafila = fila.slice(0, -1).concat(matVHolgura[i]).concat(matVArtificial[i]).concat(colita);
    return nuevafila;
  });
  pasos.push(structuredClone(matriz));

  if(matVArtificial[0].length!=0){
    // Transformar a 0 las v.artificales de Z
    let f = -1*matVArtificial[0][0];
    for (let i = 1; i < numFilas; i++) {
      if(matVArtificial[i].some((e)=>e===1)){
          for (let j = 0; j < matriz[0].length; j++) {     
            matriz[0][j] += matriz[i][j] * f;
          }
      }
    }
    pasos.push(structuredClone(matriz));
  }
  
  let optimo,c=0;
  while (true) {
    let negativos = matriz[0].slice(0,-1).some(coeficienteZ=>coeficienteZ<0);
    let positivos = matriz[0].slice(0,-1).some(coeficienteZ=>coeficienteZ>0);
    optimo = ismax? !negativos : !positivos;
    if (optimo) break;

    let pivoteX, pivoteY;
    //eligiendo columna pivote
    let valor = matriz[0][0];
    pivoteX = 0;
    for (let j = 0; j < matriz[0].length-1; j++) {
        if (ismax &&  matriz[0][j] < valor && matriz[0][j] < 0) {
            valor = matriz[0][j];
            pivoteX = j;
        }
        else if (!ismax && matriz[0][j] > valor && matriz[0][j] > 0) {
            valor = matriz[0][j];
            pivoteX = j;
        }
    }
    //eligiendo fila pivote
    valor = Infinity;
    for (let i = 1; i < matriz.length; i++){
      if (matriz[i][pivoteX] > 0) {
        let razon = matriz[i][matriz[i].length - 1] / matriz[i][pivoteX];
        if (razon < valor) {
          valor = razon;
          pivoteY = i;
        }
      }
    }
    if (pivoteY == undefined) break;
    
    // Obteniendo 1 en posicion pivote 
    let pivoteValor = matriz[pivoteY][pivoteX];
    for (let j = 0; j < matriz[pivoteY].length; j++) {
      matriz[pivoteY][j] /= pivoteValor;
    }
    pasos.push(structuredClone(matriz));
    
    // Obteniendo 0s en columna pivote
    for (let i = 0; i < numFilas; i++) {
      if (i!=pivoteY) {
          let f = -1*matriz[i][pivoteX];
          for (let j = 0; j < matriz[i].length; j++) {
            matriz[i][j] += f * matriz[pivoteY][j];
          }
      }
    }
    pasos.push(structuredClone(matriz));  


  }

  pasos = pasos.map(mat => mat.map(fila => 
      fila.map(e => 
        e.toFixed(2)
      )
    )
  );
  pasos.push(matrix);
  console.log(pasos);

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
      setMatrices(operacionesGranM(nuevo, signos, matrix));
    }
  }, [nuevo, signos, matrix]);

  return (
    <div className="proceso">
      <h1 className="titu">SOLUCION GRAN M</h1>
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