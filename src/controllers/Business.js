const Business = require('../models/business');


async function addBusiness(req, res) {
  const { 
    businessName,
    ABN,
    email,
    phone,
    streeAddress,
    postcode,
    state } = req.body;

  const business = new Business({
    businessName,
    ABN,
    email,
    phone,
    streeAddress,
    postcode,
    state,
      
  });
  await business.save();
  return res.status(201).json(business);
}

async function getBusiness(req, res) {
  const { businessId } = req.params;
  const business = await Business.findById(businessId)    

  if (!business) {
    return res.status(404).json('business not found');
  }
  return res.json(business);
}

async function getAllBusinesses(req, res) {
  const businesses = await Business.find().exec();
  return res.json(businesses);
}

async function updateBusiness(req, res) {
  const { businessId } = req.params;
  const {  
    businessName,
    ABN,
    email,
    phone,
    streeAddress,
    postcode,
    state } = req.body;
  const newBusiness = await Business.findByIdAndUpdate(
    businessId,
    { businessName,
        ABN,
        email,
        phone,
        streeAddress,
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

// async function addCourse(req, res) {
//   const { id, code } = req.params;
//   const course = await Course.findById(code).exec();
//   const category = await category.findById(id).exec();
//   if (!category || !course) {
//     return res.status(404).json('category or course not found');
//   }
//   category.courses.addToSet(course._id);
//   course.categorys.addToSet(category._id);
//   await course.save();
//   await category.save();
//   return res.json(category);
// }

// async function deleteCourse(req, res) {
//   const { id, code } = req.params;
//   const category = await category.findById(id).exec();
//   const course = await Course.findById(code).exec();
//   if (!category || !course) {
//     return res.status(404).json('category or course not found');
//   }
//   const oldCount = category.courses.length;
//   category.courses.pull(course._id);
//   if (category.courses.length === oldCount) {
//     return res.status(404).json('Enrolment does not exist');
//   }
//   course.categorys.pull(category._id);
//   await course.save();
//   await category.save();
//   return res.json(category);
// }

module.exports = {
  addBusiness,
  getAllBusinesses,
  getBusiness,
  updateBusiness,
  deleteBusiness,
};