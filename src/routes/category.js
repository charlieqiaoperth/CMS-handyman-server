const express = require('express');
const {
  getAllCategories,
  addCategory,
  updateCategory,
  deleteCategory,
  getCategory,
  addBusinesstoCategory,
  deleteBusinessFromCategory
} = require('../controllers/Category');

const router = express.Router();

router.get('/', getAllCategories);
router.get('/:categoryId', getCategory);
router.post('/', addCategory);
router.put('/:categoryId', updateCategory);
router.delete('/:categoryId', deleteCategory);
router.post('/:categoryId/businesses/:businessId', addBusinesstoCategory);
router.delete(
  '/:categoryId/businesses/:businessId',
  deleteBusinessFromCategory
);
module.exports = router;
