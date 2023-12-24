import {Router} from 'express';
import categoryController from './category.controller.js';

const router = Router();

export default router
    .get('/', categoryController.getAll)
    .get('/paginated', categoryController.getAllPaginated)
    .get('/:id', categoryController.getById)
    .post('/', categoryController.create)
    .patch('/:id', categoryController.update)
    .delete('/:id', categoryController.delete);
