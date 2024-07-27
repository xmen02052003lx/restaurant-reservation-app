import { useParams, Link } from "react-router-dom"
import { Table, Button, Row, Col } from "react-bootstrap"
import { FaDeaf, FaEdit, FaPlus, FaTrash } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux"
import { LinkContainer } from "react-router-bootstrap"
import Loader from "../components/Loader"
import Message from "../components/Message"
import MenuItem from "../components/MenuItem"
import { useGetMenuQuery } from "../slices/menuApiSlice"
const MenuScreen = () => {
  const { userInfo } = useSelector(state => state.auth)

  const { data, isLoading, error } = useGetMenuQuery()
  console.log(data)
  return (
    <>
      <Link to="/" className="btn btn-light mb-4">
        Go Back
      </Link>
      <h1>Menu Chọn Món</h1>
      {userInfo ? (
        <LinkContainer to="/manager/createmenu">
          <Button className="my-3">
            <FaPlus /> Tạo món mới
          </Button>
        </LinkContainer>
      ) : (
        ""
      )}

      <Row className="align-items-center">
        {isLoading ? (
          <Loader />
        ) : (
          data.map(product => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <MenuItem menu={product} />
            </Col>
          ))
        )}
      </Row>
    </>
  )
}
export default MenuScreen
