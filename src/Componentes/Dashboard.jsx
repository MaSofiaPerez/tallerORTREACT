import React from 'react'
import { useDispatch } from "react-redux";
import ListadoEventos from './ListadoEventos'
import { guardarCategorias } from '../features/categoriasSlice';
import { guardarEventos } from '../features/eventosSlice';
import RegistroEventos from './RegistroEventos';
import { useEffect } from "react";
import Biberones from './Biberones';
import { Container, Row, Col, Card } from 'react-bootstrap'
import Pañal from './Pañal';
import Analisis from './Analisis';
import { Navigate, useNavigate } from 'react-router-dom';


const Dashboard = () => {

  const apikey = localStorage.getItem('apikey')
  const idUser = localStorage.getItem('iduser')
  const baseURL = 'https://babytracker.develotion.com/';
  const dispatch = useDispatch()
  const navigate = useNavigate();


  useEffect(() => {
    if (apikey == null && idUser == null) {
      navigate('/');
    } else {
      fetch(baseURL + '/categorias.php', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'apikey': apikey,
          'iduser': idUser
        }
      })
        .then(response => response.json())
        .then(data => {
          if (data.codigo != 200) {
            console.log(data.mensaje)
          } else {
            console.log('Categorias: ' + data.categorias)
            dispatch(guardarCategorias(data.categorias))
          }
        })
        .catch(error => {
          console.log('Error al obtener Categorias: ' + error)
        })
      }
    }, [])


useEffect(() => {
  if (apikey == null && idUser == null) {
    navigate('/');
  } else {
  fetch(baseURL + '/eventos.php?idUsuario=' + idUser, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'apikey': apikey,
      'iduser': idUser
    }
  })
    .then(response => response.json())
    .then(data => {
      if (data.codigo != 200) {
        console.log(data.mensaje);
      } else {
        console.log('Eventos: ' + data.eventos)
        dispatch(guardarEventos(data.eventos))
      }
    })
    .catch(error => {
      console.log('Error al obtener eventos: ' + error);
    })
  }
}, []);
  
return (
  <Container fluid className="dashboard">
    <Row className="dashboard">
      <Col md={6}>
        <div className="columna">
          <ListadoEventos />
        </div>
      </Col>
      <Col md={6}>
        <div className="columna">
          <h1>Registro de Eventos</h1>
          <RegistroEventos />
        </div>
        <div className="columna">
          <h1>Informe de Eventos</h1>
          <Biberones />
          <Pañal />
        </div>
      </Col>
    </Row>
    <Row className="dashboard">
      <Col md={12}>
        <div className="columna">
          <h1>Análisis</h1>
          <Analisis />
        </div>
      </Col>
    </Row>
  </Container>
)
}


export default Dashboard