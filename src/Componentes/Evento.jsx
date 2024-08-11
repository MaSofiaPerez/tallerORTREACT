import React from 'react'
import {  useSelector,useDispatch } from "react-redux";
import Boton from './Boton';
import { eliminarEvento } from '../features/eventosSlice';


const Evento = ({id,idCategoria,detalle,fecha}) => {

  const urImagen="https://babytracker.develotion.com/imgs/"
  const baseURL = 'https://babytracker.develotion.com/';
  const apikey = localStorage.getItem('apikey')
  const idUser = localStorage.getItem('iduser')
  const categorias=useSelector(state => state.categorias.categorias)
  const categoria=categorias.find(categoria=>categoria.id===idCategoria);
  const dispatch=useDispatch();
 

  const URLImagenCategoria = () => {
    
    return categoria && categoria.imagen 
      ? `${urImagen}${categoria.imagen}.png` 
      : `${urImagen}default.png`; // URL de una imagen por defecto si no existe 'categoria'
  };

  const nombreCategoria = () => {
    // Verificar que la categoría exista antes de intentar acceder a sus propiedades
    return categoria && categoria.tipo 
      ? categoria.tipo 
      : 'Categoría desconocida';
  };


  const eliminarEventoSeleccionado=()=>
  {
    fetch(baseURL + `/eventos.php?idEvento=${id}`, {
      method: 'DELETE',
      headers: {
          'Content-Type' : 'application/json',
          'apikey' : apikey,
          'iduser' : idUser
      }
  })
  .then(response => response.json())
  .then(data =>{
      if(data.codigo === 200){
        console.log('Respuesta de la API: ' + data.mensaje)
        dispatch(eliminarEvento(id))
      }else{
        console.log(data.mensaje)
      }
  })
  .catch(error => {
      console.log('Error al eliminar evento: ' + error)
  })
  }

  return (
    
    <tr>
    <td><img src={URLImagenCategoria()} alt={nombreCategoria()}/></td>
    <td>{nombreCategoria()}</td>
    <td>{detalle}</td>
    <td>{fecha}</td>
    <td><Boton name="Eliminar" onClick={eliminarEventoSeleccionado} variant="danger" size="sm" className =""/></td>
  </tr>
  )
}

export default Evento