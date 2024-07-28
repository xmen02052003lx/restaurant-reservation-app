import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Form, Button } from "react-bootstrap"
import Loader from "../../components/Loader"
import FormContainer from "../../components/FormContainer"
import { toast } from "react-toastify"
import { useCreateMenuMutation } from "../../slices/menuApiSlice"

const MenuCreateScreen = () => {
  const [image, setImage] = useState(null)

  const [formData, setFormData] = useState({
    dish_code: "",
    name: "",
    category: "food",
    description: "",
    unit: "dĩa",
    price: "",
    discount: ""
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

  const handleFileChange = e => {
    setImage(e.target.files[0])
  }

  const validateField = (name, value) => {
    const errors = {}
    const success = {}

    switch (name) {
      case "dish_code":
        if (!value) {
          errors.dish_code = "Dish code is required"
        } else {
          success.dish_code = "Dish code looks good!"
        }
        break
      case "name":
        if (!value) {
          errors.name = "Name is required"
        } else {
          success.name = "Name looks good!"
        }
        break
      case "price":
        if (!value) {
          errors.price = "Price is required"
        } else if (isNaN(value) || value <= 0) {
          errors.price = "Price must be a positive number"
        } else {
          success.price = "Price looks good!"
        }
        break
      case "discount":
        if (isNaN(value) || value < 0 || value > 100) {
          errors.discount =
            "Discount must be a non-negative number and equal to or less than 100"
        } else {
          success.discount = "Discount looks good!"
        }
        break
      case "category":
        if (!value) {
          errors.category = "Category is required"
        } else {
          success.category = "Category looks good!"
        }
        break
      case "description":
        if (!value) {
          errors.description = "Description is required"
        } else {
          success.description = "Description looks good!"
        }
        break
      case "unit":
        if (!value) {
          errors.unit = "Unit is required"
        } else {
          success.unit = "Unit looks good!"
        }
        break
      default:
        break
    }

    setErrors(prev => ({ ...prev, [name]: errors[name] }))
    setSuccess(prev => ({ ...prev, [name]: success[name] }))
  }

  const [createMenu, { isLoading: loadingCreate }] = useCreateMenuMutation()

  const navigate = useNavigate()

  const handleSubmit = async e => {
    e.preventDefault()
    if (window.confirm("Are you sure you want to create a new product?")) {
      const formDataWithImage = new FormData()
      for (const key in formData) {
        formDataWithImage.append(key, formData[key])
      }
      formDataWithImage.append("image", image)
      try {
        await createMenu(formDataWithImage).unwrap()
        toast.success("Item added")
        navigate("/manager/menu")
      } catch (err) {
        toast.error(err?.data?.message || err.error)
      }
    }
  }

  return (
    <>
      <Link to="/menu" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Tạo Món Mới</h1>
        {loadingCreate && <Loader />}

        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="dish_code">
            <Form.Label>Dish_code</Form.Label>
            <Form.Control
              name="dish_code"
              type="text"
              placeholder="Enter Dish_code"
              value={formData.dish_code}
              onChange={handleChange}
              isInvalid={!!errors.dish_code}
              isValid={!!success.dish_code}
            ></Form.Control>
            {errors.dish_code && (
              <Form.Control.Feedback type="invalid">
                {errors.dish_code}
              </Form.Control.Feedback>
            )}
            {success.dish_code && (
              <Form.Control.Feedback type="valid">
                {success.dish_code}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              name="name"
              type="text"
              placeholder="Enter name"
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

          <Form.Group controlId="price">
            <Form.Label>Price</Form.Label>
            <Form.Control
              name="price"
              type="number"
              placeholder="Enter price"
              value={formData.price}
              onChange={handleChange}
              isInvalid={!!errors.price}
              isValid={!!success.price}
            ></Form.Control>
            {errors.price && (
              <Form.Control.Feedback type="invalid">
                {errors.price}
              </Form.Control.Feedback>
            )}
            {success.price && (
              <Form.Control.Feedback type="valid">
                {success.price}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <Form.Group controlId="discount">
            <Form.Label>Discount</Form.Label>
            <Form.Control
              name="discount"
              type="text"
              placeholder="Enter discount"
              value={formData.discount}
              onChange={handleChange}
              isInvalid={!!errors.discount}
              isValid={!!success.discount}
            ></Form.Control>
            {errors.discount && (
              <Form.Control.Feedback type="invalid">
                {errors.discount}
              </Form.Control.Feedback>
            )}
            {success.discount && (
              <Form.Control.Feedback type="valid">
                {success.discount}
              </Form.Control.Feedback>
            )}
          </Form.Group>

          <Form.Group controlId="image">
            <Form.Label>Image</Form.Label>
            <Form.Control
              name="image"
              label="Choose File"
              onChange={handleFileChange}
              type="file"
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="formCategory">
            <Form.Label>Category</Form.Label>
            <Form.Control
              name="category"
              as="select"
              value={formData.category}
              onChange={handleChange}
              isInvalid={!!errors.category}
              isValid={!!success.category}
            >
              <option value="food">Thức ăn</option>
              <option value="drinks">Đồ Uống</option>
            </Form.Control>
            {errors.category && (
              <Form.Control.Feedback type="invalid">
                {errors.category}
              </Form.Control.Feedback>
            )}
            {success.category && (
              <Form.Control.Feedback type="valid">
                {success.category}
              </Form.Control.Feedback>
            )}
          </Form.Group>

          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              name="description"
              type="text"
              placeholder="Enter description"
              value={formData.description}
              onChange={handleChange}
              isInvalid={!!errors.description}
              isValid={!!success.description}
            ></Form.Control>
            {errors.description && (
              <Form.Control.Feedback type="invalid">
                {errors.description}
              </Form.Control.Feedback>
            )}
            {success.description && (
              <Form.Control.Feedback type="valid">
                {success.description}
              </Form.Control.Feedback>
            )}
          </Form.Group>

          <Form.Group controlId="unit">
            <Form.Label>Đơn vị</Form.Label>
            <Form.Control
              name="unit"
              as="select"
              value={formData.unit}
              onChange={handleChange}
              isInvalid={!!errors.unit}
              isValid={!!success.unit}
            >
              <option value="dĩa">Dĩa</option>
              <option value="ly">Ly</option>
            </Form.Control>
            {errors.unit && (
              <Form.Control.Feedback type="invalid">
                {errors.unit}
              </Form.Control.Feedback>
            )}
            {success.unit && (
              <Form.Control.Feedback type="valid">
                {success.unit}
              </Form.Control.Feedback>
            )}
          </Form.Group>

          <Button type="submit" variant="primary" style={{ marginTop: "1rem" }}>
            Tạo Món Mới
          </Button>
        </Form>
      </FormContainer>
    </>
  )
}

export default MenuCreateScreen
