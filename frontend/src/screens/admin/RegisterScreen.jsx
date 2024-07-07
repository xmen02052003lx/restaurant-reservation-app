import { useState, useEffect } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { Form, Button, Row, Col, Nav } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import Loader from "../../components/Loader"
import FormContainer from "../../components/FormContainer"
import { LinkContainer } from "react-router-bootstrap"

import { useRegisterMutation } from "../../slices/usersApiSlice"
import { setCredentials } from "../../slices/authSlice"
import { toast } from "react-toastify"

const RegisterScreen = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [register, { isLoading }] = useRegisterMutation()

  const { userInfo } = useSelector(state => state.auth)

  const { search } = useLocation()
  const sp = new URLSearchParams(search)
  const redirect = sp.get("redirect") || "/"

  useEffect(() => {
    if (userInfo) {
      navigate(redirect)
    }
  }, [navigate, redirect, userInfo])

  const submitHandler = async e => {
    e.preventDefault()

    if (password !== confirmPassword) {
      toast.error("Passwords do not match")
    } else {
      try {
        const res = await register({ username, password }).unwrap()
        dispatch(setCredentials({ ...res }))
        navigate(redirect)
      } catch (err) {
        toast.error(err?.data?.message || err.error)
      }
    }
  }

  return (
    <div className="mb-5 pb-5" style={{ marginTop: "11em" }}>
      <FormContainer>
        <Row>
          <Col md={4} xs={5} className="auth-logo">
            <p className="special-font display-1">Steak House</p>
          </Col>{" "}
          <Col md={8} xs={7} className="">
            <Form onSubmit={submitHandler}>
              <Row>
                <Col xs={6}>
                  <LinkContainer
                    to={{
                      pathname: "/login",
                      search: redirect ? `?redirect=${redirect}` : ""
                    }}
                  >
                    <Nav.Link>Sign In</Nav.Link>
                  </LinkContainer>
                </Col>
                <Col xs={6}>
                  <LinkContainer
                    to={{
                      pathname: "/register",
                      search: redirect ? `?redirect=${redirect}` : ""
                    }}
                  >
                    <Nav.Link>Register</Nav.Link>
                  </LinkContainer>
                </Col>
              </Row>
              <Form.Group className="my-2" controlId="name">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter username"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group className="my-2" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group className="my-2" controlId="confirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <button
                className="mt-2 custom-button"
                disabled={isLoading}
                type="submit"
              >
                Register
              </button>

              {isLoading && <Loader />}
            </Form>
          </Col>
        </Row>
      </FormContainer>
    </div>
  )
}

export default RegisterScreen
