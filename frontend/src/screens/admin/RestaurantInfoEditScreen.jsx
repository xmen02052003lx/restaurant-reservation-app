import { useState, useEffect } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { Form, Button } from "react-bootstrap"
import Message from "../../components/Message"
import Loader from "../../components/Loader"
import FormContainer from "../../components/FormContainer"
import { toast } from "react-toastify"
// import {
//   useGetProductDetailsQuery,
//   useUpdateProductMutation,
//   useUploadProductImageMutation
// } from "../../slices/productsApiSlice"

const ProductEditScreen = () => {
  const { id: productId } = useParams()

  const [name, setName] = useState("")
  const [address, setAddress] = useState("")
  const [openingTimes, setOpeningTimes] = useState("")
  const [image, setImage] = useState("")
  const [description, setDescription] = useState("")

  //   const {
  //     data: product,
  //     isLoading,
  //     refetch,
  //     error
  //   } = useGetProductDetailsQuery(productId)

  //   const [updateProduct, { isLoading: loadingUpdate }] =
  //     useUpdateProductMutation()

  //   const [uploadProductImage, { isLoading: loadingUpload }] =
  //     useUploadProductImageMutation()

  const navigate = useNavigate()

  //   const submitHandler = async e => {
  //     e.preventDefault()
  //     try {
  //       await updateProduct({
  //         productId,
  //         name,
  //         price,
  //         image,
  //         brand,
  //         category,
  //         description,
  //         countInStock
  //       }).unwrap() // NOTE: here we need to unwrap the Promise to catch any rejection in our catch block
  //       toast.success("Product updated")
  //       refetch()
  //       navigate("/admin/productlist")
  //     } catch (err) {
  //       toast.error(err?.data?.message || err.error)
  //     }
  //   }

  //   useEffect(() => {
  //     if (product) {
  //       setName(product.name)
  //       setPrice(product.price)
  //       setImage(product.image)
  //       setBrand(product.brand)
  //       setCategory(product.category)
  //       setCountInStock(product.countInStock)
  //       setDescription(product.description)
  //     }
  //   }, [product])

  //   const uploadFileHandler = async e => {
  //     console.log(e.target.files[0])
  //     const formData = new FormData()
  //     formData.append("image", e.target.files[0])
  //     try {
  //       const res = await uploadProductImage(formData).unwrap()
  //       toast.success(res.message)
  //       setImage(res.image)
  //     } catch (err) {
  //       toast.error(err?.data?.message || err.error)
  //     }
  //   }

  return (
    <>
      <Link to="/" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Cập Nhật Thông Tin Nhà Hàng</h1>
        {/* {loadingUpdate && <Loader />} */}
        {/* {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error.data.message}</Message>
        ) : ( */}
        <Form>
          <Form.Group controlId="name">
            <Form.Label>Tên Nhà Hàng</Form.Label>
            <Form.Control
              type="name"
              placeholder="Nhập Tên Nhà Hàng"
              value={name}
              onChange={e => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="address">
            <Form.Label>Địa Chỉ</Form.Label>
            <Form.Control
              type="number"
              placeholder="Nhập Địa Chỉ Nhà Hàng"
              value={address}
              onChange={e => setAddress(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="openingTimes">
            <Form.Label>Thời Gian Mở Cửa</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nhập Thời Gian Mở Cửa"
              value={openingTimes}
              onChange={e => setOpeningTimes(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="image">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nhập địa chỉ URL của hình ảnh"
              value={image}
              onChange={e => setImage(e.target.value)}
            ></Form.Control>
            <Form.Control label="Choose File" type="file"></Form.Control>
            {/* {loadingUpload && <Loader />} */}
          </Form.Group>

          <Form.Group controlId="description">
            <Form.Label>Mô Tả</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nhập Mô Tả"
              value={description}
              onChange={e => setDescription(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type="submit" variant="primary" style={{ marginTop: "1rem" }}>
            Update
          </Button>
        </Form>
        {/* ) } */}
      </FormContainer>
    </>
  )
}

export default ProductEditScreen
