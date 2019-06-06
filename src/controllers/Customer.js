const Customer = require('../models/Customer');
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
  const customers = await Customer.find().exec();
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
  return res.json(newCustomer);
}

async function deleteCustomer(req, res) {
  const { customerId } = req.params;
  const customer = await Customer.findByIdAndDelete(customerId).exec();
  if (!customer) {
    return res.status(404).json('Customer not found');
  }
  // clean the refs
//   await Course.updateMany(
//     { _id: { $in: Customer.courses } },
//     { $pull: { Customers: Customer._id } }
//   ).exec();
  return res.sendStatus(200);
}

// async function addCourse(req, res) {
//   const { id, code } = req.params;
//   const course = await Course.findById(code).exec();
//   const Customer = await Customer.findById(id).exec();
//   if (!Customer || !course) {
//     return res.status(404).json('Customer or course not found');
//   }
//   Customer.courses.addToSet(course._id);
//   course.Customers.addToSet(Customer._id);
//   await course.save();
//   await Customer.save();
//   return res.json(Customer);
// }

// async function deleteCourse(req, res) {
//   const { id, code } = req.params;
//   const Customer = await Customer.findById(id).exec();
//   const course = await Course.findById(code).exec();
//   if (!Customer || !course) {
//     return res.status(404).json('Customer or course not found');
//   }
//   const oldCount = Customer.courses.length;
//   Customer.courses.pull(course._id);
//   if (Customer.courses.length === oldCount) {
//     return res.status(404).json('Enrolment does not exist');
//   }
//   course.Customers.pull(Customer._id);
//   await course.save();
//   await Customer.save();
//   return res.json(Customer);
// }

module.exports = {
  addCustomer,
  getAllCustomers,
  getCustomer,
  updateCustomer,
  deleteCustomer,
};