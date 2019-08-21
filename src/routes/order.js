const express = require('express');

const {
  getAllOrders,
  addOrder,
  updateOrder,
  deleteOrder,
  getOrder
} = require('../controllers/Order');

const router = express.Router();

router.get('/', getAllOrders);
router.get('/:orderId', getOrder);
router.post('/', addOrder);
router.put('/:orderId', updateOrder);
router.delete('/:orderId', deleteOrder);
module.exports = router;
