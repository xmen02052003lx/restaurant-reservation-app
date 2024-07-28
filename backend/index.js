const path = require("path")
const port = process.env.PORT || 5000
const connectdb = require("./src/helpers/db")
const express = require("express")
const cors = require("cors")
const app = express()
const morgan = require("morgan")
const bodyParser = require("body-parser")
const Router = require("./src/routers/index")
app.use(cors())
app.use(morgan("combined"))
app.use(bodyParser.json())
app.use(Router)

connectdb()
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")))
  app.get(
    "*",
    (req, res) =>
      res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html")) // load the index.html file that's in the frontend/builder folder which we just made static
  )
}

// connectToDB();
app.listen(port)
