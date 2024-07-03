import { useState } from "react"
import { Card, Form, Button } from "react-bootstrap"
import { Link } from "react-router-dom"
const MenuItem = ({ menu }) => {
  const [qty, setQty] = useState(0)
  const imageUrl = `data:${menu.image.contentType};base64,${menu.image.data}`

  return (
    <Card className="my-3 p-3 rounded height">
      <Link to={`/menu/:id`}>
        <Card.Img src={imageUrl} variant="top" />
      </Link>
      <Card.Body>
        <Link to={`/menu/:id`}>
          <Card.Title as="div" className="menu-title">
            <strong>{menu.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as="div">{menu.description}</Card.Text>
        <Card.Text as="h3">${menu.price}</Card.Text>
        <Form>
          <Form.Group controlId="qty">
            <Form.Label>Số lượng</Form.Label>
            <Form.Control
              name="qty"
              type="number"
              placeholder="Nhập số lượng"
              value={qty}
              onChange={e => setQty(e.target.value)}
            ></Form.Control>
          </Form.Group>
        </Form>
        <Button>Chọn</Button>
      </Card.Body>
    </Card>
  )
}
export default MenuItem
