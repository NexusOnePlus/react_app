import React, {useState} from 'react'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import Setup from './setup'
import Simplex from "../simplex/simplex"
import Dual from "../dual/Dual"
import Grafico from "../grafico/graficov2"
import M from "../M/M"
import './selector.css'
const Menu = () => {
  const [gps, setGps] = useState('home')

  return (
    <div className='espacio'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Setup />}/>
          <Route path='/Simplex' element={<Simplex />}/>
          <Route path='/Dual' element={<Dual/>}/>
          <Route path='/Grafico' element={<Grafico/>}/>
          <Route path='/Gran_M' element={<M/>}/>
        </Routes>
        <div className='Links'>
          <nav>
            <Link to='/' onClick={() => setGps('home')} >
              Home
            </Link>
            <Link to='/Simplex' onClick={() => setGps('Simplex')} >
              Simplex
            </Link>
            <Link to='/Grafico' onClick={() => setGps('Grafico')}>
              Gráfico
            </Link>
            <Link to='/Dual' onClick={() => setGps('Dual')}>
              Dual
            </Link>
            <Link to='/Gran_M' onClick={() => setGps('Gran_M')}>
              Gran M
            </Link>
            <Link to='/Dos_Fases' onClick={() => setGps('Dos_Fases')}>
              Dos Fases
            </Link>
            <div className={`animation start-${gps}`}></div>
          </nav>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default Menu