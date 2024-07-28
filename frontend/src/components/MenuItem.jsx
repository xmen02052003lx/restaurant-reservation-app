import { useEffect, useState } from "react"
import { Button, Row, Col, Image } from "react-bootstrap"
import { FaPlus } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux"
import { addToCart } from "../slices/cartSilce"

const MenuItem = ({ product, justShow }) => {
  console.log("product.image.contentType:", product)
  const imageUrl = `data:${product.image.contentType};base64,${product.image.data}`

  const cart = useSelector(state => state.cart)
  console.log("cart")
  console.log(cart)
  const dispatch = useDispatch()

  let [qty, setQty] = useState(0)

  useEffect(() => {
    const item = cart.cartItems.find(item => item._id === product._id)
    if (item) {
      console.log("item")
      console.log(item)
      console.log("item name")
      console.log(item.name)
      console.log("item qty")
      console.log(item.qty)
      setQty(prevQty => (prevQty = item.qty))
    } else {
      setQty(prevQty => (prevQty = 0))
    }
    console.log("qty")
    console.log(qty)
  }, [])

  const addToCartHandler = () => {
    const newQty = qty + 1
    setQty(newQty)
    console.log("qty in onClick", newQty)
    dispatch(addToCart({ ...product, qty: newQty }))
  }
  return (
    <Row className="mb-3">
      <Col md={4}>
        <Image
          src={imageUrl}
          className="object-fit-cover"
          fluid
          style={{ height: "100%" }}
        />
      </Col>
      <Col md={4}>
        <p className="fw-bold">{product.name}</p>
      </Col>
      <Col md={4}>
        <p style={{ color: "orange", fontWeight: "bold" }}>
          {product.price} <span>đ</span>
        </p>
        {!justShow && (
          <>
            <span className="p-2">{qty}</span>

            <Button
              variant="primary"
              className="btn-sm"
              onClick={addToCartHandler}
            >
              <FaPlus />
            </Button>
          </>
        )}
      </Col>
    </Row>
  )
}
export default MenuItem
