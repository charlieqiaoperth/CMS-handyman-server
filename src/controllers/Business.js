const Business = require('../models/business');
const Category = require('../models/category');


async function addBusiness(req, res) {
  const { 
    businessName,
    ABN,
    email,
    phone,
    streetAddress,
    postcode,
    state } = req.body;

  const business = new Business({
    businessName,
    ABN,
    email,
    phone,
    streetAddress,
    postcode,
    state,
      
  });
  await business.save();
  return res.status(201).json(business);
}

async function getBusiness(req, res) {
  const { businessId } = req.params;
  const business = await Business.findById(businessId).populate('categories','name');

  if (!business) {
    return res.status(404).json('business not found');
  }
  return res.json(business);
}

async function getAllBusinesses(req, res) {
  
  const key = req.query.key;
  const sort=req.query.sort;
  const page=parseInt(req.query.page);
  let pageSize = parseInt(req.query.pageSize);
  if (!pageSize) { pageSize = 10} ;
  const businesses = await Business.searchQuery(key,page,pageSize,sort);
  return res.json(businesses);
}

async function updateBusiness(req, res) {
  const { businessId } = req.params;
  const {  
    businessName,
    ABN,
    email,
    phone,
    streetAddress,
    postcode,
    state } = req.body;
  const newBusiness = await Business.findByIdAndUpdate(
    businessId,
    { businessName,
        ABN,
        email,
        phone,
        streetAddress,
        postcode,
        state },
    {
      new: true 
    }
  ).exec();
  if (!newBusiness) {
    return res.status(404).json('Business not found');
  }
  return res.json(newBusiness);
}

async function deleteBusiness(req, res) {
  const { businessId } = req.params;
  const business = await Business.findByIdAndDelete(businessId).exec();
  if (!business) {
    return res.status(404).json('Business not found');
  }
  return res.sendStatus(200);
}

async function addCategory(req, res) {
  const { businessId, categoryId } = req.params;
  const business = await Business.findById(businessId).exec();
  const category = await Category.findById(categoryId).exec();
  if (!business || !category) {
    return res.status(404).json('Category or Business not found');
  }
  business.categories.addToSet(category._id);
  category.businesses.addToSet(business._id);
  
  await business.save();
  await category.save();
  return res.json(business);
}

async function deleteCategory(req, res) {
  const { businessId, categoryId } = req.params;
  const category = await Category.findById(categoryId).exec();
  const business = await Business.findById(businessId).exec();
  if ( !category || !business) {
    return res.status(404).json('Business or Category not found');
  }
  const oldCount = business.categories.length;
  business.categories.pull(category._id);
  if (business.categories.length === oldCount) {
    return res.status(404).json('Enrolment does not exist');
  }
  category.businesses.pull(business._id);
  await business.save();
  await category.save();
  return res.json(business);
}

module.exports = {
  addBusiness,
  getAllBusinesses,
  getBusiness,
  updateBusiness,
  deleteBusiness,
  addCategory,
  deleteCategory
};