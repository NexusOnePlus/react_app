import React from 'react'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import Espacios from './espacios'
import Tablitas from "./proceso"
import './header.css'
const Menu = () => {
  return (
    <div className='principal'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Espacios />}/>
          <Route path='/Simplex' element={<Tablitas />}/>
        </Routes>
        <div className='Barraza'>
          <nav className='barra'>
            <Link to='/' >
              Home
            </Link>
            <Link to='/Simplex' >
              Simplex
            </Link>
            <Link to='#' >
              Gráfico
            </Link>
            <Link to='#' >
              Dual
            </Link>
            <Link to='#' >
              Gran M
            </Link>
            <Link>
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