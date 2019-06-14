const express = require('express');
const { loginUser } = require('../controllers/Auth');
const router = express.Router();

router.post('/', loginUser);

module.exports = router;