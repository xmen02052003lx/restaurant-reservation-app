import { Container, Row, Col } from "react-bootstrap"

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer>
      <Container>
        <Row>
          <Col md={4}>Theo doi chung toi tai :</Col>
          <Col md={4}>Lien he chung toi :</Col>
          <Col md={4}>HOME, ABOUT US,....</Col>
        </Row>
      </Container>
      <p className="text-center">
        &copy; {currentYear} Gogi. All rights reserved
      </p>
    </footer>
  )
}
export default Footer
