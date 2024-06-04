import React, { createContext, useState } from 'react';

export const MatrixContext = createContext();

export const MatrixProvider = ({children}) => {
  const [matrix, setMatrix] = useState([]);
    
  return (
    <MatrixContext.Provider value={{ matrix, setMatrix }}>
      {children}
    </MatrixContext.Provider>
  );
};
export default MatrixProvider