const Business = require('../models/business');
const Customer = require('../models/customer');
const Order = require('../models/order');

async function addOrder(req, res) {
  const {
    customer,
    business,
    category,
    status,
    timeRecord,
    jobLocation,
    grade,
    Comments
  } = req.body;
  const order = new Order({
    customer,
    business,
    category,
    status,
    timeRecord,
    jobLocation,
    grade,
    Comments
  });
  await order.save();
  const customerConnection = await Customer.findById(customer).exec();
  const businessConnection = await Business.findById(business).exec();
  customerConnection.orders.addToSet(order._id);
  businessConnection.orders.addToSet(order._id);
  await customerConnection.save();
  await businessConnection.save();
  return res.status(201).json(order);
}

async function getOrder(req, res) {
  const { orderId } = req.params;
  const order = await Order.findById(orderId)
    .populate('customer', 'customerName')
    .populate('business', 'businessName')
    .populate('category', 'name');

  if (!order) {
    return res.status(404).json('order not found');
  }
  return res.json(order);
}

async function getAllOrders(req, res) {
  const {searchType} = req.query; 
  const {key} = req.query;
  const {sort} = req.query;
  const page = parseInt(req.query.page);
  let pageSize = parseInt(req.query.pageSize);
  if (!pageSize) {
    pageSize = 20;
  }
  let orders = await Order.searchQuery(searchType, key, page, pageSize, sort);
  orders = orders.filter(e => e.customer !==null &&
           e.business !==null) ;

  if (orders.length === 0) {
    return res.status(404).json('order not found');
  }
  return res.json(orders);
}

async function updateOrder(req, res) {
  const { orderId } = req.params;
  const { category, status, jobLocation, grade, Comments } = req.body;

  const newOrder = await Order.findByIdAndUpdate(
    orderId,
    {
      category,
      status,
      // timeRecord,
      jobLocation,
      grade,
      Comments
    },
    {
      new: true
    }
  ).exec();

  if (!newOrder) {
    return res.status(404).json('Order not found');
  }

  if (status === 'accepted' || status === 'finished') {
    const order = await Order.findById(orderId).exec();
    if (order.timeRecord.length > 1) {
      return res.status(404).json('Record already exist');
    }
    order.timeRecord.push(order.updateTime);
    await order.save();
    return res.json(order);
  }
  return res.json(newOrder);
}

async function deleteOrder(req, res) {
  const { orderId } = req.params;

  const order = await Order.findById(orderId).exec();
  if (!order) {
    return res.status(404).json('Order not found');
  }
  const customerConnection = await Customer.findById(order.customer).exec();
  const businessConnection = await Business.findById(order.business).exec();
  customerConnection.orders.pull(order._id);
  businessConnection.orders.pull(order._id);
  await customerConnection.save();
  await businessConnection.save();
  await Order.findByIdAndDelete(orderId).exec();
  return res.sendStatus(200);
}

module.exports = {
  addOrder,
  getAllOrders,
  getOrder,
  updateOrder,
  deleteOrder
};
