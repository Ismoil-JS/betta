import { Router } from 'express';
import ProductController from './product.controller.js';

const router = Router();

export default router
    .get('/', ProductController.getAll)
    .get('/paginated', ProductController.getAllPaginated)
    .get('/:id', ProductController.getById)
    .post('/', ProductController.create)
    .patch('/:id', ProductController.update)
    .delete('/:id', ProductController.delete);
