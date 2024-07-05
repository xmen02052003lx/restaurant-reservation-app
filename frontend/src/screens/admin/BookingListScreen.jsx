import { LinkContainer } from "react-router-bootstrap"
import { Table, Button } from "react-bootstrap"
import { FaTimes } from "react-icons/fa"
import Message from "../../components/Message"
import Loader from "../../components/Loader"
import { useGetBookingsQuery } from "../../slices/bookingApiSlice"

const BookingsListScreen = () => {
  const { data: bookings, isLoading, error } = useGetBookingsQuery()

  return (
    <>
      <h1>Danh Sách Đặt Bàn</h1>
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
              <th>TÊN</th>
              <th>SĐT</th>
              <th>EMAIL</th>
              <th>DATE</th>
              <th>TIME</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {bookings.map(booking => (
              <tr key={booking._id}>
                <td>{booking._id}</td>
                <td>{booking.name}</td>
                <td>{booking.phone}</td>
                <td>{booking.email}</td>
                <td>{booking.date.substring(0, 10)}</td>
                <td>{booking.time}</td>
                <td>{booking.numberOfGuests}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default BookingsListScreen
