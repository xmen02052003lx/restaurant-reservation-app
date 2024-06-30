import { Row, Col } from "react-bootstrap"
import { useParams, Link } from "react-router-dom"
import Loader from "../components/Loader"
import Message from "../components/Message"
import MenuItem from "../components/MenuItem"

const HomeScreen = () => {
  return (
    <>
      <Link to="/" className="btn btn-light mb-4">
        Go Back
      </Link>
      <>
        <h1>Menu Chọn Món</h1>
        <Row>
          <Col sm={12} md={6} lg={4} xl={3}>
            <MenuItem />
          </Col>
        </Row>
      </>
    </>
  )
}
export default HomeScreen
