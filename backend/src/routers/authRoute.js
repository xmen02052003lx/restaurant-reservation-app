const { register, login } = require("../components/auth");

 const router = require("express").Router();
 router.post('/', login);
 router.post('/register', register);

 module.exports = router