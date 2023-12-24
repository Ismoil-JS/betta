import CategoryService from "./category.service.js";
import ProductService from "../product/product.service.js";

class CategoryController {
    async getAll(_, res) {
        try {
            const categories = await CategoryService.getAll();
            const products = await ProductService.getAll();

            categories.forEach(category => {
                category.products = products.filter(product => product.category_id === category.id);
            });

            res.status(200).json(categories);
        } catch (error) {
            res.status(error.status).json({ message: error.message });
        }
    }

    async getAllPaginated(req, res) {
        try {
            const { page, limit } = req.query;
            const categories = await CategoryService.getAllPaginated(page, limit);
            const products = await ProductService.getAll();

            categories.forEach(category => {
                category.products = products.filter(product => product.category_id === category.id);
            });

            if (categories.length === 0) {
                res.status(400).json({ message: 'Not enough category for this page!' });
                return;
            }

            res.status(200).json(categories);
        } catch (error) {
            res.status(error.status).json({ message: error.message });
        }
    }

    async getById(req, res) {
        const { id } = req.params;

        try {
            const category = await CategoryService.getById(id);

            if (!category || category.length === 0) {
            res.status(404).json({ message: 'Category not found!' });
            return;
            }

            const products = await ProductService.getAll();

            category[0].products = products.filter(product => product.category_id === id);

            res.status(200).json(category);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }

    }

    async create(req, res) {
        try {
            const { name } = req.body;

            const categoryExists = await CategoryService.getByName(name);

            if (categoryExists && categoryExists.length > 0) {
                res.status(400).json({ message: 'Category already exists with this name!' });
                return;
            }

            await CategoryService.create(name);
            res.status(204).json();
        } catch (error) {
            res.status(error.status).json({ message: error.message });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const { name } = req.body;

            const category = await CategoryService.getById(id);

            if (!category || category.length === 0) {
                res.status(400).json({ message: 'Category not found!' });
                return;
            }

            const categoryExists = await CategoryService.getByName(name);

            if (categoryExists && categoryExists.length > 0) {
                res.status(400).json({ message: 'Category already exists with this name!' });
                return;
            }

            await CategoryService.update(id, name);
            res.status(204).json();
        } catch (error) {
            res.status(error.status).json({ message: error.message });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;

            const category = await CategoryService.getById(id);

            if (!category || category.length === 0) {
                res.status(400).json({ message: 'Category not found!' });
                return;
            }
            
            await CategoryService.delete(id);
            res.status(204).json();
        } catch (error) {
            res.status(error.status).json({ message: error.message });
        }
    }

}

export default new CategoryController();