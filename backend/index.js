const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const Router = require('./src/routers/index')
app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(Router)
// connectToDB();
app.listen(3000)