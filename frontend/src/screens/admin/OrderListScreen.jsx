import { LinkContainer } from "react-router-bootstrap"
import { Table, Button, Container } from "react-bootstrap"
import { FaTimes } from "react-icons/fa"
import Message from "../../components/Message"
import Loader from "../../components/Loader"
import { useGetBillsQuery } from "../../slices/billsApiSlice"

const OrderListScreen = () => {
  const { data: orders, isLoading, error } = useGetBillsQuery()

  return (
    <>
      <Container>
        <div className="mt-5 pt-5 mb-5 pb-5">
          <h1>Orders</h1>
          {isLoading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">
              {error?.data?.message || error.error}
            </Message>
          ) : (
            <Table striped bordered hover responsive className="table-sm">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>BÀN</th>
                  <th>DATE</th>
                  <th>TOTAL</th>
                  <th>PAID</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.table_id && order.table_id._id}</td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>${order.totalPrice}</td>
                    <td>
                      {order.paid ? (
                        order.paidAt.substring(0, 10)
                      ) : (
                        <FaTimes style={{ color: "red" }} />
                      )}
                    </td>

                    <td>
                      <LinkContainer to={`/manager/bill/${order._id}`}>
                        <Button variant="light" className="btn-sm">
                          Details
                        </Button>
                      </LinkContainer>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </div>
      </Container>
    </>
  )
}

export default OrderListScreen
