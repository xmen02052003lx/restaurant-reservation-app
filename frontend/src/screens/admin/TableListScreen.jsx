import { useState } from "react"
import { Link } from "react-router-dom"
import { Button, Row, Col, Table, Container, Nav } from "react-bootstrap"
import {
  useGetTableListQuery,
  useCheckinMutation
} from "../../slices/restaurantApiSlice"
import Loader from "../../components/Loader"
import Message from "../../components/Message"
import { LinkContainer } from "react-router-bootstrap"
import { toast } from "react-toastify"
import "./TableListScreen.css"
const TableList = () => {
  const { data: tables, isLoading, error, refetch } = useGetTableListQuery()
  const [checkin, { isLoading: loadingCheckin }] = useCheckinMutation()

  const checkinHandler = async table => {
    try {
      await checkin(table).unwrap()
      toast.success("Checkin successfully")
      refetch()
    } catch (err) {
      toast.error(err?.data?.message || err.error)
    }
  }
  return (
    <>
      <Container>
        <div className="mt-5 pt-5 mb-5 pb-5">
          <h1>List Bàn</h1>

          {isLoading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error.data.message}</Message>
          ) : (
            <>
              <Table striped bordered hover responsive className="table-sm">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>STATUS</th>

                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {tables.map(table => (
                    <tr key={table._id}>
                      <td>{table._id}</td>
                      <td>
                        <div
                          className={`${
                            table.status === "0" ? "available" : "unavailable"
                          }`}
                        >
                          {table.status === "0" ? (
                            <span className="available-sign">Available</span>
                          ) : (
                            <span className="unavailable-sign">
                              Unavailable
                            </span>
                          )}
                        </div>
                      </td>
                      <td>
                        {table.status === "0" ? (
                          <button onClick={() => checkinHandler(table)}>
                            Checkin
                          </button>
                        ) : (
                          <LinkContainer to="/menu">
                            <Nav.Link>Order</Nav.Link>
                          </LinkContainer>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </>
          )}
          {loadingCheckin && <Loader />}
        </div>
      </Container>
    </>
  )
}
export default TableList
