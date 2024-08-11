import 'bootstrap/dist/js/bootstrap.bundle.min';
import Contenido from './Contenido';
import Header from './Header';
import Footer from './Footer';

const Contenedor = () => {
  return (
    <div className='background'>
       <Header />
        <Contenido />
        <Footer />
    </div>

  )
}

export default Contenedor