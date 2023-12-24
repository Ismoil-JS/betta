import { Router } from 'express';
import categoryRoutes from '../module/category/category.routes.js';
import productRoutes from '../module/product/product.routes.js';

const router = Router();

router
    .use('/category', categoryRoutes)
    .use('/product', productRoutes);

export default router;
