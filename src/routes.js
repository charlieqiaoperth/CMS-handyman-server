const express = require('express');

const customerRoute = require('./routes/customer');
// const businessRoute = require('./routes/business');
// const bookingRoute = require('./routes/booking');
// const categoryRoute = require('./routes/category');
// const userRoute = require('./routes/user');
// const authRoute = require('./routes/auth');
// const authGuard = require('./middleware/authGuard');

const router = express.Router();

router.use('/customer', customerRoute);
// router.use('/business', businessRoute);
// router.use('/booking', bookingRoute);
// router.use('/category', categoryRoute);
// router.use('/users', userRoute);
// router.use('/auth', authRoute);
router.get('/',  (req,res) => res.status('200').json('Welcome to the handyman-cms api! Visit /api-docs for help'))

module.exports = router;