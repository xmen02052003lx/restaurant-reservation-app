import { useParams, Link } from "react-router-dom"
import { Table, Button, Row, Col, Container } from "react-bootstrap"
import Image from "react-bootstrap/Image"
import { FaDeaf, FaEdit, FaPlus, FaTrash } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux"
import { LinkContainer } from "react-router-bootstrap"
import Loader from "../components/Loader"
import Message from "../components/Message"
import MenuItem from "../components/MenuItem"
import { useGetMenuQuery } from "../slices/menuApiSlice"
import PlaceOrder from "../components/PlaceOrder"
const MenuScreen = () => {
  const { userInfo } = useSelector(state => state.auth)

  const { data: products, isLoading, error } = useGetMenuQuery()

  const foodProducts = products?.filter(product => product.category === "food")
  const drinkProducts = products?.filter(
    product => product.category === "drinks"
  )
  const renderProductRows = products => {
    const rows = []
    for (let i = 0; i < products.length; i += 2) {
      rows.push(
        <Row key={i}>
          <Col md={6}>
            <MenuItem product={products[i]} />
          </Col>
          {i + 1 < products.length && (
            <Col md={6}>
              <MenuItem product={products[i + 1]} />
            </Col>
          )}
        </Row>
      )
    }
    return rows
  }

  return (
    <>
      <Link to="/" className="btn btn-light mb-4">
        Go Back
      </Link>
      <h1>Menu Chọn Món</h1>

      {isLoading ? (
        <Loader />
      ) : (
        <Container>
          <Row>
            <Col md={4}>
              <PlaceOrder />
            </Col>
            <Col md={8}>
              <h2>Food</h2>
              {renderProductRows(foodProducts)}

              <h2>Drinks</h2>
              {renderProductRows(drinkProducts)}
            </Col>
          </Row>
        </Container>
      )}
    </>
  )
}
export default MenuScreen
