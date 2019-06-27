const Customer = require('../models/customer');
// const Course = require('../models/course');

async function addCustomer(req, res) {
  const { customerName, preferName, email, phone } = req.body;

  const customer = new Customer({
    customerName,
    preferName,
    email,
    phone
  });
  await customer.save();
  return res.json(customer);
}

async function getCustomer(req, res) {
  const { customerId } = req.params;

  const customer = await Customer.findById(customerId)    

  if (!customer) {
    return res.status(404).json('Customer not found');
  }
  return res.json(customer);
}

async function getAllCustomers(req, res) {
  const key = req.query.key;
  const sort=req.query.sort;
  const page=parseInt(req.query.page);
  let pageSize = parseInt(req.query.pageSize);
  if (!pageSize) { pageSize = 10} ;
  const customers = await Customer.searchQuery(key,page,pageSize,sort);
  return res.json(customers);
}

async function updateCustomer(req, res) {
  const { customerId } = req.params;
  const { customerName, preferName, email, phone } = req.body;
  const newCustomer = await Customer.findByIdAndUpdate(
    customerId,
    { customerName, preferName, email, phone },
    {
      new: true 
    }
  ).exec();
  if (!newCustomer) {
    return res.status(404).json('Customer not found');
  }
  return res.status(201).json(newCustomer);
}

async function deleteCustomer(req, res) {
  const { customerId } = req.params;
  const customer = await Customer.findByIdAndDelete(customerId).exec();
  if (!customer) {
    return res.status(404).json('Customer not found');
  }

  return res.sendStatus(200);
}


module.exports = {
  addCustomer,
  getAllCustomers,
  getCustomer,
  updateCustomer,
  deleteCustomer,
};