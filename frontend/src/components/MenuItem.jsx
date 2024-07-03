import { useState } from "react"
import { Card, Form, Button } from "react-bootstrap"
import { Link } from "react-router-dom"
const MenuItem = ({ menu }) => {
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
      </Card.Body>
    </Card>
  )
}
export default MenuItem
