import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { Card, Row, Col, Image } from 'react-bootstrap';

const InformeEventos = ({ idCategoria, tituloCantidad, tituloUltimo, imagen, alt }) => {
    const eventos = useSelector(state => state.eventos.eventos);
    const [datos, setDatos] = useState({
        cantidad: 0,
        ultimoEvento: null,
        tiempoTranscurrido: null
    });

    useEffect(() => {
        const calcularEventos = () => {
            let resultado = {
                cantidad: 0,
                ultimoEvento: null
            };

            const hoy = new Date();
            const inicioDelDia = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate());
            const finDelDia = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate() + 1);

            for (let i = 0; i < eventos.length; i++) {
                const fechaEvento = new Date(eventos[i].fecha);

                if (isNaN(fechaEvento.getTime())) {
                    continue;
                }

                if (eventos[i].idCategoria === idCategoria && fechaEvento >= inicioDelDia && fechaEvento < finDelDia) {
                    resultado.cantidad++;
                    resultado.ultimoEvento = fechaEvento;
                }
            }

            if (resultado.ultimoEvento) {
                const ahora = new Date();
                const diferenciaMs = ahora - resultado.ultimoEvento;
                const horas = Math.floor(diferenciaMs / (1000 * 60 * 60));
                const minutos = Math.floor((diferenciaMs % (1000 * 60 * 60)) / (1000 * 60));
                resultado.tiempoTranscurrido = `${horas} horas y ${minutos} minutos`;
            } else {
                resultado.tiempoTranscurrido = 'No disponible';
            }

            return resultado;
        };

        const nuevosDatos = calcularEventos();
        setDatos(nuevosDatos);

        const interval = setInterval(() => {
            const nuevosDatos = calcularEventos();
            setDatos(nuevosDatos);
        }, 60000); // Actualizar cada minuto

        return () => clearInterval(interval);
    }, [eventos, idCategoria]);

    return (
        <Card className="mb-4">
            <Card.Body>
                <Row>
                    <Col xs={12} md={6}>
                        <Card.Title>{tituloCantidad}</Card.Title>
                        {Array.from({ length: datos.cantidad }).map((_, index) => (
                                <Image 
                                    key={index} 
                                    src={imagen} 
                                    alt={alt} 
                                    roundedCircle 
                                    className="me-1"
                                />
                            ))}                    </Col>
                    <Col xs={12} md={6}>
                        <Card.Title>{tituloUltimo}</Card.Title>
                        <Card.Text>{datos.tiempoTranscurrido}</Card.Text>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
};

export default InformeEventos;