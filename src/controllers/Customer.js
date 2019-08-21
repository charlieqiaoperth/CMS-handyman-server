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

  const customer = await Customer.findById(customerId);

  if (!customer) {
    return res.status(404).json('Customer not found');
  }
  return res.json(customer);
}

async function getAllCustomers(req, res) {
  const {
    searchType = 'customerName',
    searchKeyword,
    pageRequested = 1,
    pageSize = 5,
    sortType = 'customerName',
    sortValue = 1
  } = req.query;
  let customerCount;
  if (!searchType) {
    customerCount = await Customer.countDocuments();
  } else {
    customerCount = await Customer.countDocuments({
      [searchType]: new RegExp(searchKeyword, 'i')
    });
  }
  const customers = await Customer.searchByQuery(
    searchType,
    searchKeyword,
    pageRequested,
    pageSize,
    sortType,
    sortValue
  );
  if (!customers || customers.length === 0) {
    return res.status(404).json('Customers are not found');
  }
  if (typeof customers === 'string') {
    return res.status(500).json(customers);
  }
  return res.json({ customerCount, customers });
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
  deleteCustomer
};
