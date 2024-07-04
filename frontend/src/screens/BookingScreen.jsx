import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Form, Button } from "react-bootstrap"
import Message from "../components/Message"
import Loader from "../components/Loader"
import FormContainer from "../components/FormContainer"
import { toast } from "react-toastify"
import { useCreateBookingMutation } from "../slices/bookingApiSlice"
import DatePicker from "react-datepicker"

const ProductEditScreen = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    date: new Date(),
    time: "",
    numberOfGuests: ""
  })

  const handleChange = e => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleDateChange = date => {
    setFormData({
      ...formData,
      date: date
    })
  }

  const [createBooking, { isLoading: loadingBooking }] =
    useCreateBookingMutation()

  const navigate = useNavigate()

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      await createBooking(formData).unwrap()
      toast.success("Đặt bàn thành công")
      navigate("/menu")
    } catch (err) {
      toast.error(err?.data?.message || err.error)
    }
  }

  return (
    <>
      <Link to="/" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Đặt Bàn</h1>
        {loadingBooking && <Loader />}

        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="name">
            <Form.Label>Tên Người Đặt</Form.Label>
            <Form.Control
              name="name"
              type="text"
              placeholder="Nhập tên"
              value={formData.name}
              onChange={handleChange}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="phone">
            <Form.Label>Số Điện Thoại</Form.Label>
            <Form.Control
              name="phone"
              type="number"
              placeholder="Nhập số điện thoại"
              value={formData.phone}
              onChange={handleChange}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label>email</Form.Label>
            <Form.Control
              name="email"
              type="email"
              placeholder="Nhập email"
              value={formData.email}
              onChange={handleChange}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="date">
            <Form.Label>Date</Form.Label>
            <DatePicker
              selected={formData.date}
              onChange={handleDateChange}
              dateFormat="yyyy-MM-dd"
              className="form-control"
            />
          </Form.Group>

          <Form.Group controlId="numberOfGuests">
            <Form.Label>Số Người</Form.Label>
            <Form.Control
              name="numberOfGuests"
              as="select"
              value={formData.numberOfGuests}
              onChange={handleChange}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="time">
            <Form.Label>Thời Gian</Form.Label>
            <Form.Control
              name="time"
              as="select"
              value={formData.time}
              onChange={handleChange}
            >
              <option value="19:00">19:00</option>
              <option value="20:00">20:00</option>
            </Form.Control>
          </Form.Group>

          <Button type="submit" variant="primary" style={{ marginTop: "1rem" }}>
            Đặt Bàn
          </Button>
        </Form>
      </FormContainer>
    </>
  )
}

export default ProductEditScreen
