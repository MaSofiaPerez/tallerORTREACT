import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const formatearFecha = (fecha) => {
    const opciones = { day: '2-digit', month: '2-digit' };
    return new Intl.DateTimeFormat('es-ES', opciones).format(fecha);
};

const GraficoComidas = () => {
    const eventos = useSelector(state => state.eventos.eventos);
    const [data, setData] = useState({ labels: [], datasets: [] });

    useEffect(() => {
        const comidasUltimaSemana = {};
        const fechaActual = new Date();
        const fechaHace7Dias = new Date();
        fechaHace7Dias.setDate(fechaActual.getDate() - 6);

        const fechasUltimaSemana = [];
        for (let i = new Date(fechaHace7Dias); i <= fechaActual; i.setDate(i.getDate() + 1)) {
            const fechaFormateada = formatearFecha(i);
            fechasUltimaSemana.push(fechaFormateada);
            comidasUltimaSemana[fechaFormateada] = 0;
        }

        eventos.forEach(evento => {
            const fechaEvento = new Date(evento.fecha);
            const fechaEventoFormateada = formatearFecha(fechaEvento);

            if (evento.idCategoria === 31 && fechaEvento >= fechaHace7Dias) {
                comidasUltimaSemana[fechaEventoFormateada]++;
            }
        });

        setData({
            labels: fechasUltimaSemana,
            datasets: [
                {
                    label: 'Cantidad de comidas por día registradas en la última semana',
                    data: fechasUltimaSemana.map(fecha => comidasUltimaSemana[fecha] || 0),
                    backgroundColor: 'rgb(74, 144, 226)',
                    borderColor: 'rgb(74, 144, 226)',
                    borderWidth: 1,
                },
            ],
        });
    }, [eventos]);

    return <Bar data={data} />;
};

export default GraficoComidas;
