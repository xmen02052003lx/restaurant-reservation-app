import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap"
import { FaUser, FaBookOpen, FaTable } from "react-icons/fa"
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
      <Navbar
        fixed="top"
        // bg="white"
        style={{
          boxShadow: "4.0px 8.0px 8.0px hsl(0deg 0% 0% / 0.38)",
          backgroundColor: "#111",
          opacity: "0.95"
        }}
        expand="md"
        collapseOnSelect
      >
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <span style={{ color: "white" }}> Steak House</span>
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="m-auto">
              <LinkContainer to="/thucdon">
                <Nav.Link>
                  <FaBookOpen color="white" />
                  <span style={{ color: "white" }}> THỰC ĐƠN </span>
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/booking">
                <Nav.Link>
                  <FaTable color="white" />{" "}
                  <span style={{ color: "white" }}> ĐẶT BÀN </span>
                </Nav.Link>
              </LinkContainer>
            </Nav>
            {userInfo ? (
              <>
                <NavDropdown
                  style={{ color: "white" }}
                  title={userInfo.username}
                  id="username"
                >
                  <LinkContainer to="/manager/restaurant/66817d1fdba1724bb5388925">
                    <NavDropdown.Item>
                      Chỉnh Sửa Thông Tin Nhà Hàng
                    </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/manager/menu">
                    <NavDropdown.Item>Chỉnh Sửa Thực Đơn</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/manager/bookingslist">
                    <NavDropdown.Item>Danh Sách Đặt Bàn</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/manager/tablelist">
                    <NavDropdown.Item>Số Bàn</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/manager/orderlist">
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <LinkContainer to="/login" style={{ color: "white" }}>
                <Nav.Link>
                  <FaUser /> Đăng Nhập
                </Nav.Link>
              </LinkContainer>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}
export default Header
