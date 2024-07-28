import { useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { Form, Button } from "react-bootstrap"
import Loader from "../../components/Loader"
import FormContainer from "../../components/FormContainer"
import { toast } from "react-toastify"
import { useUpdateMenuMutation } from "../../slices/menuApiSlice"

const MenuEditScreen = () => {
  const { id: menuId } = useParams()

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
      case "price":
        if (isNaN(value) || value <= 0) {
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

      default:
        break
    }

    setErrors(prev => ({ ...prev, [name]: errors[name] }))
    setSuccess(prev => ({ ...prev, [name]: success[name] }))
  }

  const [updateMenu, { isLoading: loadingUpdate }] = useUpdateMenuMutation()

  const navigate = useNavigate()

  const handleSubmit = async e => {
    e.preventDefault()
    const formDataWithImage = new FormData()
    for (const key in formData) {
      formDataWithImage.append(key, formData[key])
    }
    formDataWithImage.append("image", image)
    formDataWithImage.append("_id", menuId)
    // Convert FormData to object
    const formDataObj = {}
    formDataWithImage.forEach((value, key) => {
      formDataObj[key] = value
    })
    console.log(formDataObj)
    console.log(formDataObj._id)
    try {
      await updateMenu(formDataObj).unwrap() // NOTE: here we need to unwrap the Promise to catch any rejection in our catch block
      toast.success("Menu updated")
      navigate("/manager/menu")
    } catch (err) {
      toast.error(err?.data?.message || err.error)
    }
  }

  return (
    <>
      <Link to="/manager/menu" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Menu</h1>

        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="dish_code">
            <Form.Label>Dish_code</Form.Label>
            <Form.Control
              name="dish_code"
              type="text"
              placeholder="Enter Dish_code"
              value={formData.dish_code}
              onChange={handleChange}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              name="name"
              type="text"
              placeholder="Enter name"
              value={formData.name}
              onChange={handleChange}
            ></Form.Control>
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
            >
              <option value="food">Thức ăn</option>
              <option value="drinks">Đồ Uống</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              name="description"
              type="text"
              placeholder="Enter description"
              value={formData.description}
              onChange={handleChange}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="unit">
            <Form.Label>Đơn vị</Form.Label>
            <Form.Control
              name="unit"
              as="select"
              value={formData.unit}
              onChange={handleChange}
            >
              <option value="dĩa">Dĩa</option>
              <option value="ly">Ly</option>
            </Form.Control>
          </Form.Group>

          <Button type="submit" variant="primary" style={{ marginTop: "1rem" }}>
            Update
          </Button>
        </Form>
        {loadingUpdate && <Loader />}
      </FormContainer>
    </>
  )
}

export default MenuEditScreen
