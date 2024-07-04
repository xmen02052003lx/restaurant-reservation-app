const connectDB = require("../../helpers/db")
const User = require("../../models/users")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const yup = require("yup")

const signupSchema = yup.object().shape({
  username: yup
    .string()
    .email("Email không hợp lệ")
    .required("Email là bắt buộc"),
  password: yup
    .string()
    .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
    .required("Mật khẩu là bắt buộc")
})

const authentication = async (req, res, next) => {
  const bearerToken = req.headers.authorization
  console.log(bearerToken)
  if (!bearerToken) {
    return res.status(401).json({ message: "Bạn chưa đăng nhập" })
  }

  const token = bearerToken.split(" ")[1] // Bearer token
  try {
    const checkToken = await jwt.verify(token, "secret-key")
    const userId = checkToken.id
    next()
  } catch (error) {
    return res.status(401).json(error)
  }
}
const login = async (req, res) => {
  try {
    console.log(req.body)
    const validate = await signupSchema.validate(req.body)
    console.log(`validate: ${validate}`)
    if (validate) {
      const { username, password } = req.body
      const user = await User.findOne({ username })

      if (!user) {
        return res.status(401).json({ msg: "Đăng nhập thất bại" })
      }
      const isPasswordValid = await bcrypt.compare(password, user.password)
      if (!isPasswordValid) {
        return res.status(401).json({ msg: "Đăng nhập thất bại" })
      }
      const token = jwt.sign({ userId: user._id }, "secret-key", {
        expiresIn: "1h"
      })
      res.json({ token, username })
    }
  } catch (error) {
    res.status(500).json(error)
  }
}

const register = async (req, res) => {
  try {
    const validate = await signupSchema.validate(req.body)
    if (validate) {
      const { username, password } = req.body
      const hashedPassword = await bcrypt.hash(password, 10)
      const newUser = new User({ username, password: hashedPassword })
      await newUser.save()
      res.status(201).json({ username, message: "Đăng ký thành công" })
    }
  } catch (error) {
    res.status(500).json(error)
  }
}

module.exports = {
  register,
  login,
  authentication
}
