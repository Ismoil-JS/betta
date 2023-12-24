import ProductService from "./product.service.js";
import CategoryService from "../category/category.service.js";

class ProductController {
    async getAll(_, res) {
        try {
            const products = await ProductService.getAll();
            const categories = await CategoryService.getAll();

            products.forEach(product => {
                product.category = categories.find(category => category.id === product.category_id);
                product.category_id = undefined;
            });

            res.status(200).json(products);
        } catch (error) {
            res.status(error.status).json({ message: error.message });
        }
    }

    async getAllPaginated(req, res) {
        try {
            const { page, limit } = req.query;
            const products = await ProductService.getAllPaginated(page, limit);
            const categories = await CategoryService.getAll();

            products.forEach(product => {
                product.category = categories.find(category => category.id === product.category_id);
                product.category_id = undefined;
            });

            if (products.length === 0) {
                res.status(400).json({ message: 'Not enough category for this page!' });
                return;
            }

            res.status(200).json(products);
        } catch (error) {
            res.status(error.status).json({ message: error.message });
        }
    }

    async getById(req, res) {
    try {
        const { id } = req.params
        const product = await ProductService.getById(id);

        if (!product || product.length === 0) {
            res.status(404).json({ message: 'Product not found!' });
            return;
        }

        const category = await CategoryService.getById(product[0].category_id);

        if (!category || category.length === 0) {
            res.status(404).json({ message: 'Category not found for the product!' });
            return;
        }

        const updatedProduct = { ...product[0], category: category[0], category_id: undefined };

        res.status(200).json(updatedProduct);
        }   catch (error) {
                res.status(error.status).json({ message: error.message });
            }
        }

    async create(req, res) {
        try {
            const { name, price, image, category_id } = req.body;

            await ProductService.create({name, price, image, category_id});
            res.status(204).json();
        } catch (error) {
            res.status(error.status).json({ message: error.message });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const { name, price, image, category_id } = req.body;

            const product = await ProductService.getById(id);

            if (!product || product.length === 0) {
                res.status(400).json({ message: 'Product not found!' });
                return;
            }

            await ProductService.update(id, name, price, image, category_id);
            res.status(204).json();
        } catch (error) {
            res.status(error.status).json({ message: error.message });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;

            const product = await ProductService.getById(id);

            if (!product || product.length === 0) {
                res.status(400).json({ message: 'Product not found!' });
                return;
            }
            
            await ProductService.delete(id);
            res.status(204).json();
        } catch (error) {
            res.status(error.status).json({ message: error.message });
        }
    }

}

export default new ProductController();