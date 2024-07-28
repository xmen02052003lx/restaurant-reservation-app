import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Form, Button } from "react-bootstrap"
import Loader from "../components/Loader"
import FormContainer from "../components/FormContainer"
import { toast } from "react-toastify"
import { useCreateBookingMutation } from "../slices/bookingApiSlice"
import DatePicker from "react-datepicker"

const BookingScreen = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    date: new Date(),
    time: "",
    numberOfGuests: ""
  })

  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState({})

  const handleChange = e => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
    validateField(name, value)
  }

  const handleDateChange = date => {
    setFormData({
      ...formData,
      date: date
    })
  }

  const validateField = (name, value) => {
    const errors = {}
    const success = {}

    switch (name) {
      case "name":
        if (!value) {
          errors.name = "Name is required"
        } else {
          success.name = "Name looks good!"
        }
        break
      case "phone":
        if (!value) {
          errors.phone = "Phone number is required"
        } else if (!/^\d{10}$/.test(value)) {
          errors.phone = "Phone number is invalid"
        } else {
          success.phone = "Phone number looks good!"
        }
        break
      case "email":
        if (!value) {
          errors.email = "Email is required"
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          errors.email = "Email address is invalid"
        } else {
          success.email = "Email looks good!"
        }
        break
      case "numberOfGuests":
        if (!value) {
          errors.numberOfGuests = "Number of guests is required"
        } else {
          success.numberOfGuests = "Number of guests looks good!"
        }
        break
      case "time":
        if (!value) {
          errors.time = "Time is required"
        } else {
          success.time = "Time looks good!"
        }
        break
      default:
        break
    }

    setErrors(prev => ({ ...prev, [name]: errors[name] }))
    setSuccess(prev => ({ ...prev, [name]: success[name] }))
  }

  const validateForm = () => {
    const errors = {}
    const success = {}

    if (!formData.name) {
      errors.name = "Name is required"
    } else {
      success.name = "Name looks good!"
    }

    if (!formData.phone) {
      errors.phone = "Phone number is required"
    } else if (!/^\d{10}$/.test(formData.phone)) {
      errors.phone = "Phone number is invalid"
    } else {
      success.phone = "Phone number looks good!"
    }

    if (!formData.email) {
      errors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email address is invalid"
    } else {
      success.email = "Email looks good!"
    }

    if (!formData.numberOfGuests) {
      errors.numberOfGuests = "Number of guests is required"
    } else {
      success.numberOfGuests = "Number of guests looks good!"
    }

    if (!formData.time) {
      errors.time = "Time is required"
    } else {
      success.time = "Time looks good!"
    }

    setErrors(errors)
    setSuccess(success)

    return { errors, success }
  }

  const [createBooking, { isLoading: loadingBooking }] =
    useCreateBookingMutation()

  const navigate = useNavigate()

  const handleSubmit = async e => {
    e.preventDefault()

    const { errors } = validateForm()
    if (Object.keys(errors).length > 0) {
      return
    }

    try {
      await createBooking(formData).unwrap()
      toast.success("Đặt bàn thành công")
      navigate("/")
    } catch (err) {
      toast.error("Khong hop le")
    }
  }

  return (
    <>
      <div className="mt-5 pt-3 mb-5">
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
                isInvalid={!!errors.name}
                isValid={!!success.name}
              ></Form.Control>
              {errors.name && (
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              )}
              {success.name && (
                <Form.Control.Feedback type="valid">
                  {success.name}
                </Form.Control.Feedback>
              )}
            </Form.Group>
            <Form.Group controlId="phone">
              <Form.Label>Số Điện Thoại</Form.Label>
              <Form.Control
                name="phone"
                type="number"
                placeholder="Nhập số điện thoại"
                value={formData.phone}
                onChange={handleChange}
                isInvalid={!!errors.phone}
                isValid={!!success.phone}
              ></Form.Control>
              {errors.phone && (
                <Form.Control.Feedback type="invalid">
                  {errors.phone}
                </Form.Control.Feedback>
              )}
              {success.phone && (
                <Form.Control.Feedback type="valid">
                  {success.phone}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label>email</Form.Label>
              <Form.Control
                name="email"
                type="email"
                placeholder="Nhập email"
                value={formData.email}
                onChange={handleChange}
                isInvalid={!!errors.email}
                isValid={!!success.email}
              ></Form.Control>
              {errors.email && (
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              )}
              {success.email && (
                <Form.Control.Feedback type="valid">
                  {success.email}
                </Form.Control.Feedback>
              )}
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
                isInvalid={!!errors.numberOfGuests}
                isValid={!!success.numberOfGuests}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </Form.Control>
              {errors.numberOfGuests && (
                <Form.Control.Feedback type="invalid">
                  {errors.numberOfGuests}
                </Form.Control.Feedback>
              )}
              {success.numberOfGuests && (
                <Form.Control.Feedback type="valid">
                  {success.numberOfGuests}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            <Form.Group controlId="time">
              <Form.Label>Thời Gian</Form.Label>
              <Form.Control
                name="time"
                as="select"
                value={formData.time}
                onChange={handleChange}
                isInvalid={!!errors.time}
                isValid={!!success.time}
              >
                <option value="19:00">19:00</option>
                <option value="20:00">20:00</option>
              </Form.Control>
              {errors.time && (
                <Form.Control.Feedback type="invalid">
                  {errors.time}
                </Form.Control.Feedback>
              )}
              {success.time && (
                <Form.Control.Feedback type="valid">
                  {success.time}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            <Button
              type="submit"
              variant="primary"
              style={{ marginTop: "1rem" }}
            >
              Đặt Bàn
            </Button>
          </Form>
        </FormContainer>
      </div>
    </>
  )
}

export default BookingScreen
