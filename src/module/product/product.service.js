import { ProductModel } from "./product.model.js";

class ProductService {
    #productModel;

    constructor() {
        this.#productModel = new ProductModel();
    }

    async getAll() {
        return await this.#productModel.getAll();
    }

    async getAllPaginated(page, limit) {
        return await this.#productModel.getAllPaginated(page, limit);
    }

    async getById(id) {
        return await this.#productModel.getById(id);
    }

    async getByCategory(category_id) {
        return await this.#productModel.getByCategory(category_id);
    }

    async create(payload) {
        return await this.#productModel.create(payload);
    }

    async update(id, name, price, image, category_id) {
        return await this.#productModel.update(id, name, price, image, category_id);
    }

    async delete(id) {
        return await this.#productModel.delete(id);
    }

};

export default new ProductService();