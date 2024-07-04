import { useState } from "react"
import { Link } from "react-router-dom"
import { Button, Row, Col } from "react-bootstrap"
import Table from "../../components/Table"
const TableList = () => {
  return (
    <Row className="align-items-center">
      <Col sm={12} md={6} lg={4} xl={3}>
        <Table />
        <Table />
        <Table />
      </Col>
    </Row>
  )
}
export default TableList
