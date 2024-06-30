import { useState } from "react"
import { Card, Form, Button } from "react-bootstrap"
import { Link } from "react-router-dom"
const Product = () => {
  const [qty, setQty] = useState(0)
  return (
    <Card className="my-3 p-3 rounded height">
      <Link to={`/product/:id`}>
        <Card.Img
          src="https://media.vov.vn/sites/default/files/styles/large/public/2020-09/26_1.jpg"
          variant="top"
        />
      </Link>
      <Card.Body>
        <Link to={`/product/:id`}>
          <Card.Title as="div" className="product-title">
            <strong>Tên món ăn</strong>
          </Card.Title>
        </Link>
        <Card.Text as="div">Văn bản miêu tả về món ăn</Card.Text>
        <Card.Text as="h3">Giá tiền: 10K</Card.Text>
        <Form>
          <Form.Group controlId="Quantity">
            <Form.Label>Số lượng</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter quantity"
              value={qty}
              onChange={e => setQty(e.target.value)}
            ></Form.Control>
          </Form.Group>
        </Form>
        <Button type="submit" variant="primary" style={{ marginTop: "1rem" }}>
          Chọn
        </Button>
      </Card.Body>
    </Card>
  )
}
export default Product
