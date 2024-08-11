import InformeEventos from './InformeEventos';

const Biberones = () => {
    return (
        <InformeEventos 
            idCategoria={35} 
            tituloCantidad="Total de biberones en el día" 
            tituloUltimo="El último biberón fue hace: " 
            imagen = {"https://babytracker.develotion.com/imgs/5.png"}
            alt ={"Pañal"}
        />
    );
};

export default Biberones;
