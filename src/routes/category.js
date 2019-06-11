const express = require('express');
const {
  getAllCategories,
  addCategory,
  updateCategory,
  deleteCategory,
  getCategory,  
} = require('../controllers/Category');
const router = express.Router();

router.get('/', getAllCategories);
// router.get('/',(req,res)=>(res.json('hahha')));//test route 
router.get('/:categoryId', getCategory);
router.post('/', addCategory);
router.put('/:categoryId', updateCategory);
router.delete('/:categoryId', deleteCategory);
module.exports = router;