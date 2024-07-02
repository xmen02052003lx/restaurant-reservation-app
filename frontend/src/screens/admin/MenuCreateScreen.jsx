import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Form, Button } from "react-bootstrap"
import Message from "../../components/Message"
import Loader from "../../components/Loader"
import FormContainer from "../../components/FormContainer"
import { toast } from "react-toastify"
import {
  useCreateMenuMutation,
  useGetMenuItemDetailsQuery,
  useUpdateMenuMutation
} from "../../slices/menuApiSlice"

const ProductEditScreen = () => {
  //   const [dish_code, setDish_code] = useState("")
  //   const [name, setName] = useState("")
  //   const [category, setCategory] = useState("")
  //   const [description, setDescription] = useState("")
  //   const [unit, setUnit] = useState("")
  //   const [price, setPrice] = useState(0)
  //   const [discount, setDiscount] = useState("")
  const [image, setImage] = useState(null)

  const [formData, setFormData] = useState({
    dish_code: "",
    name: "",
    category: "",
    description: "",
    unit: "",
    price: "",
    discount: ""
  })

  const handleChange = e => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleFileChange = e => {
    setImage(e.target.files[0])
  }

  const [createMenu, { isLoading: loadingUpdate }] = useCreateMenuMutation()

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
        navigate("/menu")
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
        <h1>Edit Product</h1>
        {loadingUpdate && <Loader />}

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
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="discount">
            <Form.Label>Discount</Form.Label>
            <Form.Control
              name="discount"
              type="text"
              placeholder="Enter discount"
              value={formData.discount}
              onChange={handleChange}
            ></Form.Control>
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
              <option value="Food">Thức ăn</option>
              <option value="Drinks">Đồ Uống</option>
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
              <option value="Food">Dĩa</option>
              <option value="Drinks">Ly</option>
            </Form.Control>
          </Form.Group>

          <Button type="submit" variant="primary" style={{ marginTop: "1rem" }}>
            Tạo Món Mới
          </Button>
        </Form>
      </FormContainer>
    </>
  )
}

export default ProductEditScreen
