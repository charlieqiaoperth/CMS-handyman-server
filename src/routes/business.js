const express = require('express');
const {
  addBusiness,
  getAllBusinesses,
  getBusiness,
  updateBusiness,
  deleteBusiness,
  addCategory,
  deleteCategory
} = require('../controllers/Business');

const router = express.Router();

router.get('/', getAllBusinesses);
// router.get('/',(req,res)=>(res.json('hahha')));//test route
router.get('/:businessId', getBusiness);
router.post('/', addBusiness);
router.put('/:businessId', updateBusiness);
router.delete('/:businessId', deleteBusiness);
router.post('/:businessId/categories/:categoryId', addCategory);
router.delete('/:businessId/categories/:categoryId', deleteCategory);
module.exports = router;
