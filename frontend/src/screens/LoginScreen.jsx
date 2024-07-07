import "./LoginScreen.css"
import { useState, useEffect } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { Form, Button, Row, Col, Nav } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import Loader from "../components/Loader"
import FormContainer from "../components/FormContainer"
import { useLoginMutation } from "../slices/usersApiSlice"
import { setCredentials } from "../slices/authSlice"
import { toast } from "react-toastify"
import { LinkContainer } from "react-router-bootstrap"

const LoginScreen = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const dispatch = useDispatch() // useDispatch: dispatch actions such as the login in that slice and the set credentials
  const navigate = useNavigate()

  const [login, { isLoading }] = useLoginMutation()

  const { userInfo } = useSelector(state => state.auth) // useSelector: get stuff from the state

  const { search } = useLocation()
  const sp = new URLSearchParams(search) // sp: search params
  const redirect = sp.get("redirect") || "/"

  useEffect(() => {
    // check to see if we are logged in
    // if userInfo in local storage
    if (userInfo) {
      // navigate to whatever inside the "rediect"param (redirect=...)
      navigate(redirect)
    }
  }, [navigate, redirect, userInfo])

  const submitHandler = async e => {
    e.preventDefault()
    try {
      const res = await login({ username, password }).unwrap()
      dispatch(setCredentials({ ...res }))
      navigate(redirect)
    } catch (err) {
      toast.error(err?.data?.message || err.error)
    }
  }

  return (
    <div className="mb-5 pb-5 mt-5">
      <FormContainer>
        <Row>
          <Col md={4} xs={5} className="auth-logo">
            <p className="special-font display-1">Steak House</p>
          </Col>{" "}
          <Col md={8} xs={7} className="">
            <Form onSubmit={submitHandler} className="mt-5 pt-5">
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
              <Form.Group className="my-2" controlId="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
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

              <button
                disabled={isLoading}
                type="submit"
                className="mt-3 custom-button"
              >
                Sign In
              </button>

              {isLoading && <Loader />}
            </Form>
          </Col>
        </Row>
      </FormContainer>
    </div>
  )
}

export default LoginScreen
