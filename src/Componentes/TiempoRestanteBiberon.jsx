import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Container, Row, Col, Image } from 'react-bootstrap';


const TiempoRestanteBiberon = () => {
    const eventos = useSelector(state => state.eventos.eventos);
    const [tiempoRestante, setTiempoRestante] = useState('');
    const [backgroundColor, setBackgroundColor] = useState('');


    useEffect(() => {
        const calcularTiempoRestante = () =>{
            const ultimoBiberon = eventos
                .filter(e => e.idCategoria == 35)
                .sort((a,b) => new Date(b.fecha) - new Date(a.fecha))[0]?.fecha 

                if (!ultimoBiberon){
                    setTiempoRestante("No se ha registrado ningún biberón")
                    return
                } 

                const ultimaFecha = new Date(ultimoBiberon)
                const ahora = new Date();
                const diferencia = ahora - ultimaFecha;
                const horasRestantes = 4 - Math.floor(diferencia/(1000*60*60))
                if (horasRestantes > 0) {
                    setTiempoRestante(`${horasRestantes} horas para el próximo biberón`);
                    setBackgroundColor('#d4edda'); // Fondo verde claro si faltan horas
                } else {
                    setTiempoRestante('¡Tiempo de un nuevo biberón!');
                    setBackgroundColor('#f5c6cb'); // Fondo rojo claro si es el momento de tomar un biberón
                }

        }
        calcularTiempoRestante();
    }, [eventos])
    

  
    return (
        <Container className="d-flex align-items-center justify-content-center mt-4">
        <Row className="align-items-center" style={{ backgroundColor, padding: '5px', borderRadius: '10px' }}>
            <Col xs="auto">
                <Image src={"https://babytracker.develotion.com/imgs/5.png"} alt="Biberón" roundedCircle />
            </Col>
            <Col className="text-center">
                <h1 style={{ color: tiempoRestante.includes('¡Tiempo de un nuevo biberón!') ? 'red' : 'green' }}>
                    {tiempoRestante}
                </h1>
            </Col>
            <Col xs="auto">
                <Image src={"https://babytracker.develotion.com/imgs/5.png"} alt="Biberón" roundedCircle />
            </Col>
        </Row>
    </Container>
    );
};

export default TiempoRestanteBiberon;