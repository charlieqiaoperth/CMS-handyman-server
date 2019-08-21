const express = require('express');
const addUser = require('../controllers/User');

const router = express.Router();

router.post('/', addUser);

module.exports = router;
