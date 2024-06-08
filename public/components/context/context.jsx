import React, { createContext, useState } from 'react';

export const MatrixContext = createContext();

export const MatrixProvider = ({children}) => {
  const [matrix, setMatrix] = useState([]);
  const [min, setMin] = useState(false);
    
  return (
    <MatrixContext.Provider value={{ matrix, setMatrix , min, setMin}}>
      {children}
    </MatrixContext.Provider>
  );
};
export default MatrixProvider