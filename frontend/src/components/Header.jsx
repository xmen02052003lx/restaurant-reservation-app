import { Navbar, Nav, Container } from "react-bootstrap"
import { FaUser } from "react-icons/fa"
import { LinkContainer } from "react-router-bootstrap"
const Header = () => {
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="md" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>Gogi</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <LinkContainer to="/menu">
                <Nav.Link>Menu chọn món</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/login">
                <Nav.Link>
                  <FaUser /> Sign In
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/editRestaurant">
                <Nav.Link>
                  <FaUser /> Cập Nhật Thông Tin Nhà Hàng
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}
export default Header
