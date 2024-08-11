import { Row, Col } from 'react-bootstrap';
import GraficoComidas from './GraficoComidas';
import GraficoCategorias from './GraficoCategorias';

const Graficos = () => {
    return (
        <Row>
            <Col md={6}>
                <GraficoComidas />
            </Col>
            <Col md={6}>
                <GraficoCategorias />
            </Col>
        </Row>
    );
};

export default Graficos;