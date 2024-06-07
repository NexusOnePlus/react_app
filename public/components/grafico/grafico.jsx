import React, { useContext, useEffect, useState } from 'react';
import './grafico.css';
import { MatrixContext } from '../context/context';
import functionPlot from 'function-plot';

// Resolver sistema de ecuaciones para encontrar intersección
function solveLinearEquations(a1, b1, c1, a2, b2, c2) {
  const det = a1 * b2 - a2 * b1;
  if (det === 0) return null; // No hay solución o hay infinitas soluciones
  const x = (c1 * b2 - c2 * b1) / det;
  const y = (a1 * c2 - a2 * c1) / det;
  return [x, y];
}

// Encontrar todos los puntos de intersección
function findIntersections(matriz) {
  const points = [];
  for (let i = 0; i < matriz.length; i++) {
    for (let j = i + 1; j < matriz.length; j++) {
      const [a1, b1,, c1] = matriz[i];
      const [a2, b2,, c2] = matriz[j];
      const point = solveLinearEquations(a1, b1, c1, a2, b2, c2);
      if (point) points.push(point);
    }
  }
  return points;
}

// Evaluar la función objetivo en un punto
function evaluateObjective([x, y], objective) {
  const [a, b] = objective;
  return a * x + b * y;
}

// Parsear las restricciones a expresiones y filtrar por operadores válidos
function parseExpression([operand1, operand2, operator, result]) {
  operand1 = operand1 || '0';
  operand2 = operand2 || '0';
  result = result || '0';
  const signos = ['<=', '<', '>', '>='];
  if (signos.includes(operator)) {
    return `(${result} - ${operand1} * x) / ${operand2}`;
  } else {
    return null;
  }
}

function trazando(matriz, objective, setResults) {
  const funciones = matriz.map(parseExpression).filter(Boolean);
  const data = funciones.map((fn) => ({ fn }));
  
  // Graficar las restricciones
  functionPlot({
    target: '#aqui',
    data
  });

  // Encontrar y evaluar intersecciones
  const intersections = findIntersections(matriz);
  const evaluatedPoints = intersections.map(point => ({
    point,
    value: evaluateObjective(point, objective)
  }));
  console.log("Intersections and Z values:", evaluatedPoints);

  // Actualizar los resultados en el estado
  setResults(evaluatedPoints);
}

const Grafico = () => {
  const { matrix} = useContext(MatrixContext); // Suponiendo que 'objective' está en el contexto
  const [results, setResults] = useState([]);
  const [objective, setObjective] = useState(() => {
    if (matrix && matrix.length > 0 && matrix[0].length >= 2) {
      return [parseInt(matrix[0][0], 10), parseInt(matrix[0][1], 10)];
    } else {
      return [0, 0]; // Valor por defecto si la matriz no es válida
    }
  });

  useEffect(() => {
    if (matrix && matrix.length > 0) {
      trazando(matrix, objective, setResults);
    }
  }, [matrix]);

  return (
    <div className='grafico'>
      <h1 className='titulograf'>GRAFICO</h1>
      <div id='aqui' className='aquigraf'></div>
      <div className='resultados' style={{marginTop: '20px'}}>
        <h2>Resultados</h2>
        {results.map((result, index) => (
          <p key={index}>
            x1: {result.point[0].toFixed(2)}, x2: {result.point[1].toFixed(2)}, z: {result.value.toFixed(2)}
          </p>
        ))}
      </div>
    </div>
  );
}

export default Grafico;