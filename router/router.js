const express = require('express');
const { loginpage, registrationpage, createUser, loginprocess, indexpage } = require('../controller/controller');

const router = express.Router();

router.get('/',loginpage)
router.get("/index",indexpage)
router.post("/loginvalidation",loginprocess)
router.get('/registration',registrationpage)
router.post('/createUser',createUser)

module.exports = router