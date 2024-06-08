import React, { useContext, useEffect, useState } from 'react';
import './grafico.css';
import { MatrixContext } from '../context/context';
import { JSXGraph } from 'jsxgraph';

const Grafico = () => {
  const { matrix } = useContext(MatrixContext); // Suponiendo que 'matrix' está en el contexto
  const [results, setResults] = useState([]);
  const [respuesta, setRespuesta] = useState('');
  const [objective, setObjective] = useState(() => {
    if (matrix && matrix.length > 0 && matrix[0].length >= 2) {
      return [parseInt(matrix[0][0], 10), parseInt(matrix[0][1], 10)];
    } else {
      return [0, 0]; // Valor por defecto si la matriz no es válida
    }
  });

  useEffect(() => {
    if (matrix && matrix.length > 0) {
      const restrictions = matrix.slice(1); // Asumiendo que las restricciones están en las filas 1 en adelante
      JSXBoard(restrictions);
    }
  }, [matrix]);


  // Parsear las restricciones a expresiones y filtrar por operadores válidos
  function parseExpression([operand1, operand2, operator, result]) {
    operand1 = operand1 || '0';
    operand2 = operand2 || '0';
    result = result || '0';
    const signos = ['<=', '<', '>', '>='];
    if (signos.includes(operator)) {
      return [-parseFloat(result), parseFloat(operand1), parseFloat(operand2)];
    } else {
      return null;
    }
  }

  function calculateIntersection(line1, line2) {
    const [c1, a1, b1] = line1;
    const [c2, a2, b2] = line2;
    const determinant = a1 * b2 - a2 * b1;

    if (determinant === 0) {
      return null; // Las líneas son paralelas
    }

    const x = (b2 * c1 - b1 * c2) / determinant;
    const y = (a1 * c2 - a2 * c1) / determinant;
    return [Math.abs(x), Math.abs(y)];
  }

  function JSXBoard(restrictions) {
    let pasos = []
    // Crear o seleccionar el contenedor para el gráfico
    const containerId = 'aqui';
    const brd = JSXGraph.initBoard(containerId, {
      boundingbox: [-1, 10, 10, -1],
      axis: true
    });

    // Colors for different inequalities
    const colors = ['red', 'blue', 'green', 'purple', 'orange', 'cyan', 'magenta', 'yellow'];

    const parsedExpressions = restrictions.map(parseExpression).filter(exp => exp !== null);
    const intersectionPoints = [];
    let pointsy = Infinity;
    let pointsx = Infinity;
    let pointsyObj = null;
    let pointsxObj = null;

    // Graficar cada inecuación
    parsedExpressions.forEach((parsedExpression, index) => {
      const line = brd.create('line', parsedExpression, { strokeColor: colors[index % colors.length] });

      // Calculate intersection points with axes
      const [c, a, b] = parsedExpression;
      if (b !== 0) {
        const yIntercept = -c / b;
        // console.log("y antes:", yIntercept)
        if (yIntercept >= 0) {
          const yPoint = brd.create('point', [0, yIntercept], { color: colors[index % colors.length], size: 2 });
          if (pointsy > yIntercept) {
            pointsy = yIntercept;
            pointsyObj = yPoint;
            console.log("y", yIntercept);
          }
        }
        // console.log(pointsy);
      }
      if (a !== 0) {
        const xIntercept = -c / a;
        if (xIntercept >= 0) {
          const xPoint = brd.create('point', [xIntercept, 0], { color: colors[index % colors.length], size: 2 });
          if (pointsx > xIntercept) {
            pointsx = xIntercept;
            pointsxObj = xPoint;
            // console.log("x", xIntercept);
          }
        }
      }
    });

    // Calculate and mark intersection points of all pairs of lines
    for (let i = 0; i < parsedExpressions.length; i++) {
      for (let j = i + 1; j < parsedExpressions.length; j++) {
        const intersection = calculateIntersection(parsedExpressions[i], parsedExpressions[j]);
        pasos.push(intersection);
        if (intersection && intersection[0] >= 0 && intersection[1] >= 0) {
          const point = brd.create('point', intersection, { color: colors[(i + j) % colors.length], size: 3, name: `(${intersection[0].toFixed(2)}, ${intersection[1].toFixed(2)})` });
          intersectionPoints.push(point);
          console.log(intersection)
        }
      }
    }
    let mayor = -Infinity
    let elindmayor= [];
    for (let j = 0; j < pasos.length; j++) {
      let a = objective[0] * pasos[j][0] + objective[1] * pasos[j][1];
      // console.log(a)
      if (a > mayor ){
        mayor = a;
        elindmayor = [pasos[j][0], pasos[j][1]]
      }
    }
    console.log(elindmayor)
    // Include the origin (0, 0) for the feasible region
    let feasiblePoints = [];
    feasiblePoints.push(brd.create('point', [0, 0], { visible: true, size: 3, color: 'black', name: '(0,0)' }));
    if (pointsxObj) feasiblePoints.push(pointsxObj);
    feasiblePoints.push(brd.create('point', elindmayor, { visible: true, size: 3, color: 'cyan', name: '' }));
    if (pointsyObj) feasiblePoints.push(pointsyObj);
    pasos.push([0, pointsy]);
    pasos.push([pointsx, 0]);
    pasos.push([0, 0]);

    console.log(feasiblePoints);

    // Create a polygon for the feasible region
    if (feasiblePoints.length > 0) {
      brd.create('polygon', feasiblePoints, { borders: { strokeColor: 'black' }, fillColor: 'rgba(255, 255, 0, 0.5)' });
    }
    console.log(pasos);
    
    setRespuesta(mayor)
    console.log(respuesta)
    setResults(pasos);
  }

  return (
    <div className='grafico'>
      <h1 className='titulograf'>GRAFICO</h1>
      <h2 style={{ marginBottom: '20px' }}>Trazado</h2>
      <div id='aqui' className='aquigraf' style={{ width: '500px', height: '400px', background: 'rgb(243, 231, 231)' }}></div>
      <div className='resultados' style={{ marginTop: '20px' }}>
        <h2>Resultados</h2>
        {results && results.map((i, index) => {
          
          return (
            <h2 
              key={index} 
              style={{color: (objective[0] * i[0] + objective[1] * i[1] === respuesta ? 'cyan' : null)}}>
              {`${index + 1}. (${i[0]}, ${i[1]}) = ${objective[0]}(${i[0]}) + ${objective[1]}(${i[1]}) = ${objective[0] * i[0] + objective[1] * i[1]}`}
            </h2>
          );
          
        })}
      </div>
    </div>
  );
}

export default Grafico;
