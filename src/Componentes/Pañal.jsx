import InformeEventos from './InformeEventos';

const Pañal = () => {
    return (
        <InformeEventos 
            idCategoria={33} 
            tituloCantidad="Total de pañales en el día" 
            tituloUltimo="El último pañal fue hace: " 
            imagen = {"https://babytracker.develotion.com/imgs/3.png"}
            alt ={"Pañal"}
        />
    );
};

export default Pañal;


