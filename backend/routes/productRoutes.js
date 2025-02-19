// Kevin Barrett 301258511
import express from 'express'
const router = express.Router()
import {
  getProducts,
  getProductById,
  
} from '../controllers/productController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').get(getProducts).post(protect, admin, createProduct)

router
  .route('/:id')
  .get(getProductById)

export default router
