import Registro from './Registro'
import Login from './Login'
import {Routes, Route } from 'react-router-dom'
import Dashboard from './Dashboard'
import NoEncontrado from './NoEncontrado'

const Contenido = () => {

    
  return (

    <main>

        <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/registro" element={<Registro/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/*" element={<NoEncontrado /> } />
        </Routes>
        </main>


  )
}

export default Contenido