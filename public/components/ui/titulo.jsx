import React from 'react'
import logo from "../icons/IO-removebg-preview.png"
import './titulo.css'
const Titulo = () => {
  return (
    <div className='logos'> 
        <img src={logo} width={50} height={50} alt="Logo" />
        <h1>PROYECTO INVESTIGACION OPERATIVA</h1>
        <h2> Preview 💡</h2>
    </div>
  )
}

export default Titulo
