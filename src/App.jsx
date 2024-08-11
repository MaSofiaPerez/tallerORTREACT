import { Provider } from 'react-redux'
import './App.css'
import { store } from './src/store'
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Contenedor from './Componentes/Contenedor';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Contenedor />
      </BrowserRouter>
    </Provider>
  )
}

export default App
