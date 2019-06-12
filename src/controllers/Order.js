// const Business = require('../models/business');
// const Category = require('../models/category');
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

  return res.status(201).json(order);
}

async function getOrder(req, res) {
  const { orderId } = req.params;
  const order = await Order.findById(orderId).populate('customer','customerName').populate('business','businessName').populate('category','name');

  if (!order) {
    return res.status(404).json('order not found');
  }
  return res.json(order);
}

async function getAllOrders(req, res) {
  const orders = await Order.find().exec();
  return res.json(orders);
}

async function updateOrder(req, res) {
  const { orderId } = req.params;
  const {  
    category,
    status,   
    jobLocation,
    // timeRecord,
    grade,
    Comments  } = req.body;
   

  const newOrder = await Order.findByIdAndUpdate(
    orderId,
    {  
        category,
        status,    
        // timeRecord,    
        jobLocation,
        grade,
        Comments  },
    {
      new: true 
    }
  ).exec();
 
  if (!newOrder) {
    return res.status(404).json('Order not found');
  };
  
  if ( status==="accepted" || status==="finished") {
    const order = await Order.findById(orderId).exec();   
    if (order.timeRecord.length>1) {return res.status(404).json('Record already exist') }
    order.timeRecord.push(order.updateTime);  
    await order.save();
    return res.json(order);
    }  
  return res.json(newOrder);
}

async function deleteOrder(req, res) {
  const { orderId } = req.params;
  const order = await Order.findByIdAndDelete(orderId).exec();
  if (!order) {
    return res.status(404).json('Order not found');
  }
  return res.sendStatus(200);
}

// async function addCategory(req, res) {
//   const { businessId, categoryId } = req.params;
//   const business = await Business.findById(businessId).exec();
//   const category = await Category.findById(categoryId).exec();
//   if (!business || !category) {
//     return res.status(404).json('Category or Business not found');
//   }
//   business.categories.addToSet(category._id);
//   category.businesses.addToSet(business._id);
  
//   await business.save();
//   await category.save();
//   return res.json(business);
// }

// async function deleteCategory(req, res) {
//   const { businessId, categoryId } = req.params;
//   const category = await Category.findById(categoryId).exec();
//   const business = await Business.findById(businessId).exec();
//   if ( !category || !business) {
//     return res.status(404).json('Business or Category not found');
//   }
//   const oldCount = business.categories.length;
//   business.categories.pull(category._id);
//   if (business.categories.length === oldCount) {
//     return res.status(404).json('Enrolment does not exist');
//   }
//   category.businesses.pull(business._id);
//   await business.save();
//   await category.save();
//   return res.json(business);
// }

module.exports = {
  addOrder,
  getAllOrders,
  getOrder,
  updateOrder,
  deleteOrder,
//   addCategory,
//   deleteCategory
};