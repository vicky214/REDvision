const express = require('express');
const router = express.Router();
const requireLogin = require('../middleware/requireLogin')
const {Login, Register, Dashboard} = require("../controller/auth");

router.post('/register', Register);
router.post('/login', Login);
router.get('/dashboard', requireLogin, Dashboard);

module.exports=router;