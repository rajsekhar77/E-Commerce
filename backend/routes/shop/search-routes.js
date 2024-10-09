import express from 'express';
import { searchProducts } from '../../controllers/shop/search-products.js';

const router = express.Router();

router.get("/:keyword", searchProducts);

export default router;