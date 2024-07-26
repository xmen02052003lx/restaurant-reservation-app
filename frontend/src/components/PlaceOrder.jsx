import { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import Message from "../components/Message"
import Loader from "../components/Loader"
import { usePickupDishMutation } from "../slices/restaurantApiSlice"
import { clearCartItems } from "../slices/cartSilce"

const PlaceOrder = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const cart = useSelector(state => state.cart)

  return (
    <>
      <Card>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <h2>Order Items</h2>
            {cart.cartItems.length === 0 ? (
              <Message>Your cart is empty</Message>
            ) : (
              <ListGroup
                variant="flush"
                style={{ maxHeight: "20em", overflowY: "auto" }}
              >
                {cart.cartItems.map((item, index) => {
                  const imageUrl = `data:${item.image.contentType};base64,${item.image.data}`

                  return (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={3}>
                          <Image src={imageUrl} alt={item.name} fluid rounded />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price} = $
                          {(item.qty * (item.price * 100)) / 100}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )
                })}
              </ListGroup>
            )}
          </ListGroup.Item>
        </ListGroup>
      </Card>
    </>
  )
}
export default PlaceOrder
