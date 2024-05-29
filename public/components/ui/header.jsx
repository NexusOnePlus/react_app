import React from 'react'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import Espacios from './espacios'
import Tablitas from "./proceso"
import Dual from "./Dual"
import './header.css'
const Menu = () => {
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
            <Link to='/' >
              Home
            </Link>
            <Link to='/Simplex' >
              Simplex
            </Link>
            <Link to='/Grafico' >
              Gráfico
            </Link>
            <Link to='/Dual' >
              Dual
            </Link>
            <Link to='/Gran_M' >
              Gran M
            </Link>
            <Link to='/Dos_Fases'>
              Dos Fases
            </Link>
            <span></span>
          </nav>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default Menu