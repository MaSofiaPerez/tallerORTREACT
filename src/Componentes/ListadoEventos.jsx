import {  useSelector } from "react-redux";
import Evento from './Evento';
import {Container, Table } from 'react-bootstrap'


const ListadoEventos = () => {

  const eventos=useSelector(state => state.eventos.eventos)
  
  const listadoHoy=(eshoy)=>
  {
    const hoy = new Date();
        const inicioDelDia = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate());
        const finDelDia = new Date(inicioDelDia).setDate(inicioDelDia.getDate() + 1);
    if(eshoy){
        return eventos.filter(evento => {
            const fechaEvento = new Date(evento.fecha);
            return fechaEvento >= inicioDelDia && fechaEvento < finDelDia;
        });
      }else
      {
        return eventos.filter(evento => {
          const fechaEvento = new Date(evento.fecha);
          return fechaEvento < inicioDelDia;
      });
      }
  }

  return (
    <Container>
      <h1>Eventos de Hoy</h1>
      <div className="table-container">
        <Table className="table-responsive">
          <thead>
            <tr>
              <th>Imagen</th>
              <th>Categoría</th>
              <th>Detalle</th>
              <th>Fecha</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {listadoHoy(true).map(evento => (
              <Evento key={evento.id} {...evento} />
            ))}
          </tbody>
        </Table>
      </div>

      <h1>Eventos Anteriores</h1>
      <div className="table-container">
        <Table className="table-responsive">
          <thead>
            <tr>
              <th>Imagen</th>
              <th>Categoría</th>
              <th>Detalle</th>
              <th>Fecha</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {listadoHoy(false).map(evento => (
              <Evento key={evento.id} {...evento} />
            ))}
          </tbody>
        </Table>
      </div>
    </Container>
  )
    
}

export default ListadoEventos