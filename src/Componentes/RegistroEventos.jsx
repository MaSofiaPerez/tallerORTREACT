import { useState, useRef } from 'react'
import { useSelector, useDispatch } from "react-redux";
import Boton from './Boton'
import { guardarEvento } from '../features/eventosSlice'
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import ToastCustomizado from './ToastCustomizado';

const RegistroEventos = () => {
  const [idCategoriaSeleccionada, setidCategoriaSeleccionada] = useState("")
  const categorias = useSelector(state => state.categorias.categorias)
  const dispatch = useDispatch()
  const fechaEvento = useRef("")
  const detalles = useRef("")
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastVariant, setToastVariant] = useState('danger');

  const apikey = localStorage.getItem('apikey')
  const idUser = localStorage.getItem('iduser')
  const baseURL = 'https://babytracker.develotion.com/';

  const verificarFecha = (fecha) => {
    return new Date(fecha) > new Date();
  }

  const limpiarCampos = () => {
    fechaEvento.current.value = new Date();
    detalles.current.value = "";
  }

  const obtenerFechaActual = () => {
    const now = new Date();
    return `${now.getFullYear()}-${('0' + (now.getMonth() + 1)).slice(-2)}-${('0' + now.getDate()).slice(-2)} ${('0' + now.getHours()).slice(-2)}:${('0' + now.getMinutes()).slice(-2)}:${('0' + now.getSeconds()).slice(-2)}`;
  };

  const formatearFechaParaGuardar = (fecha) => {
    if (!fecha) return obtenerFechaActual();
    const date = new Date(fecha);
    return `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)} ${('0' + date.getHours()).slice(-2)}:${('0' + date.getMinutes()).slice(-2)}:${('0' + date.getSeconds()).slice(-2)}`;
  };

  const tomarDatos = () => {
    const datosEvento = {
      idCategoria: Number(idCategoriaSeleccionada),
      idUsuario: Number(idUser),
      detalle: detalles.current.value,
      fecha: formatearFechaParaGuardar(fechaEvento.current.value)
    }
    if (verificarFecha(fechaEvento.current.value)) {
      setToastMessage('La fecha debe ser anterior o igual al día de hoy');
      setToastVariant('danger');
      setShowToast(true);
      limpiarCampos();
    } else {
      fetch(baseURL + '/eventos.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': apikey,
          'iduser': idUser
        },
        body: JSON.stringify(datosEvento)
      })
        .then(response => response.json())
        .then(data => {
          datosEvento.id = data.idEvento;
          dispatch(guardarEvento(datosEvento))
          limpiarCampos()
        })
        .catch(error => {
          console.log('Error al ingresar evento: ' + error)
        })
    }
  }

  const actualizarCategoria = (e) => {
    setidCategoriaSeleccionada(e.target.value)
  }

  return (
    <Container className="mt-5">
      <Form className="">
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="categoriaEvento">
              <Form.Label className="fw-bold">Categoría</Form.Label>
              <Form.Control
                as="select"
                onChange={actualizarCategoria}
                className="custom-select"
              >
                <option value="">Seleccione una Categoría</option>
                {categorias.map((categoria) => (
                  <option key={categoria.id} value={categoria.id}>
                    {categoria.tipo}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Form.Group controlId="fechaHoraEvento">
              <Form.Label className="fw-bold">Fecha y Hora</Form.Label>
              <Form.Control
                type="datetime-local"
                ref={fechaEvento}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Form.Group controlId="detalleEvento">
              <Form.Label className="fw-bold">Detalles (opcional)</Form.Label>
              <Form.Control
                type="text"
                ref={detalles}
                placeholder="Ingrese detalles aquí"
              />
            </Form.Group>
          </Col>
        </Row>

        <div className='mt-4'>
          <Boton onClick={tomarDatos} name="Agregar Evento" variant="secondary"></Boton>
        </div>
        <ToastCustomizado
          show={showToast}
          onClose={() => setShowToast(false)}
          message={toastMessage}
          variant={toastVariant}
        />
      </Form>
    </Container>
  )
  {/*<Container className="mt-5">
      <Form >
        <Form.Group controlId="categoriaEvento">
          <Form.Label>Seleccione una Categoría</Form.Label>
          <Form.Control
            as="select"
            onChange={actualizarCategoria}
          >
            <option value="">Seleccione una Categoría</option>
            {categorias.map((categoria) => (
              <option key={categoria.id} value={categoria.id}>
                {categoria.tipo}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="fechaHoraEvento" className="mt-3">
          <Form.Label>Fecha y Hora</Form.Label>
          <Form.Control
            type="datetime-local"
            ref={fechaEvento}
          />
        </Form.Group>

        <Form.Group controlId="detalleEvento" className="mt-3">
          <Form.Label>Detalles (opcional)</Form.Label>
          <Form.Control
            type="text"
            ref={detalles}
            placeholder="Ingrese detalles aquí"
          />
        </Form.Group>
        <div className='mt-4'>
          <Boton onClick={tomarDatos} name="Agregar Evento" variant="secondary"></Boton>
        </div>
        <ToastCustomizado
          show={showToast}
          onClose={() => setShowToast(false)}
          message={toastMessage}
          variant={toastVariant}
        />
      </Form>
    </Container>*/}



}

export default RegistroEventos