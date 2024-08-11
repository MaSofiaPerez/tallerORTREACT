import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const GraficoCategorias = () => {
  const eventos = useSelector(state => state.eventos.eventos);
  const categorias = useSelector(state => state.categorias.categorias);
  const [data, setData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const conteoCategorias = {};

    eventos.forEach(evento => {
      const categoria = categorias.find(c => c.id === evento.idCategoria);
      if (categoria) {
        const tipoCategoria = categoria.tipo;
        if (!conteoCategorias[tipoCategoria]) {
          conteoCategorias[tipoCategoria] = 0;
        }
        conteoCategorias[tipoCategoria]++;
      }
    });

    const labels = Object.keys(conteoCategorias);
    const values = Object.values(conteoCategorias);

    setData({
      labels: labels,
      datasets: [
        {
          label: 'Cantidad de eventos por categoría registrados',
          data: values,
          backgroundColor: 'rgb(229, 115, 115)',
          borderColor: 'rgb(229, 115, 115)',
          borderWidth: 1,
        },
      ],
    });
  }, [eventos, categorias]);

  return <Bar data={data} />;
};

export default GraficoCategorias;