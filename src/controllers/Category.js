const Category = require('../models/category');
// const Course = require('../models/course');

async function addCategory(req, res) {
  const { name, description, } = req.body;

  const category = new Category({
    name,
    description,    
  });
  await category.save();
  return res.status(201).json(category);
}

async function getCategory(req, res) {
  const { categoryId } = req.params;
  const category = await Category.findById(categoryId)    

  if (!category) {
    return res.status(404).json('Category not found');
  }
  return res.json(category);
}

async function getAllCategories(req, res) {
  const categorys = await Category.find().exec();
  return res.json(categorys);
}

async function updateCategory(req, res) {
  const { categoryId } = req.params;
  const { name, description } = req.body;
  const newCategory = await Category.findByIdAndUpdate(
    categoryId,
    { name, description },
    {
      new: true 
    }
  ).exec();
  if (!newCategory) {
    return res.status(404).json('Category not found');
  }
  return res.json(newCategory);
}

async function deleteCategory(req, res) {
  const { categoryId } = req.params;
  const category = await Category.findByIdAndDelete(categoryId).exec();
  if (!category) {
    return res.status(404).json('Category not found');
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
  addCategory,
  getAllCategories,
  getCategory,
  updateCategory,
  deleteCategory,
};