import { Navbar, Container, Nav, NavbarToggle, NavbarCollapse, NavbarBrand } from 'react-bootstrap'
import Logout from './Logout'

const Header = () => {

    return (
            <header>
                <Navbar bg="dark" data-bs-theme="dark">
                    <Container>
                        <NavbarBrand href="">BabyTracker</NavbarBrand>
                        <NavbarToggle aria-controls="basic-navbar-nav" />
                        <NavbarCollapse id="basic-navbar-nav">
                            <Nav className='ms-auto'>
                            <Logout />
                            </Nav>
                        </NavbarCollapse>
                    </Container>
                </Navbar>
            </header>
    )
}

export default Header