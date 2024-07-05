import { Navbar, Nav, Container, Badge, NavDropdown } from "react-bootstrap"
import { FaShoppingCart, FaUser, FaBookOpen, FaTable } from "react-icons/fa"
import { LinkContainer } from "react-router-bootstrap"
import { useSelector, useDispatch } from "react-redux" // useDispatch is used to interact with our state's actions, and useSelector is used to access our state in the store.js
import { useNavigate } from "react-router-dom"
import { logout } from "../slices/authSlice"

const Header = () => {
  const { userInfo } = useSelector(state => state.auth)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logoutHandler = async () => {
    try {
      dispatch(logout()) // clear the local storage
      navigate("/login")
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <header>
      <Navbar bg="primary" variant="dark" expand="md" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>GoGi</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <LinkContainer to="/menu">
                <Nav.Link>
                  <FaBookOpen /> Menu
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/booking">
                <Nav.Link>
                  <FaTable /> Đặt Bàn
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/cart">
                <Nav.Link>
                  <FaShoppingCart /> Giỏ hàng
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <>
                  <NavDropdown title={userInfo.username} id="username">
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/manager/bookingslist">
                      <NavDropdown.Item>Danh Sách Đặt Bàn</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/manager/tablelist">
                      <NavDropdown.Item>Số Bàn</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <FaUser /> Đăng Nhập
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}
export default Header
