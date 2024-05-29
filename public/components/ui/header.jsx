import React, {useState} from 'react'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import Espacios from './espacios'
import Tablitas from "./proceso"
import Dual from "./Dual"
import './header.css'
const Menu = () => {
  const [gps, setGps] = useState('home')

  return (
    <div className='principal'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Espacios />}/>
          <Route path='/Simplex' element={<Tablitas />}/>
          <Route path='/Dual' element={<Dual/>}/>
        </Routes>
        <div className='Barraza'>
          <nav className='barra'>
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