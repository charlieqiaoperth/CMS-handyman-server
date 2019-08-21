const express = require('express');
const {
  getAllCustomers,
  addCustomer,
  updateCustomer,
  deleteCustomer,
  getCustomer
} = require('../controllers/Customer');

const router = express.Router();

router.get('/', getAllCustomers);
router.get('/:customerId', getCustomer);
router.post('/', addCustomer);
router.put('/:customerId', updateCustomer);
router.delete('/:customerId', deleteCustomer);
module.exports = router;
