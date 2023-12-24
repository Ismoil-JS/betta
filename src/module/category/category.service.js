import { CategoryModel } from "./category.model.js";

class CategoryService {
    #categoryModel;

    constructor() {
        this.#categoryModel = new CategoryModel();
    }

    async getAll() {
        return await this.#categoryModel.getAll();
    }

    async getAllPaginated(page, limit) {
        return await this.#categoryModel.getAllPaginated(page, limit);
    }

    async getById(id) {
        return await this.#categoryModel.getById(id);
    }

    async getByName(name) {
        return await this.#categoryModel.getByName(name);
    }

    async create(name) {
        return await this.#categoryModel.create(name);
    }

    async update(id, name) {
        return await this.#categoryModel.update(id, name);
    }

    async delete(id) {
        return await this.#categoryModel.delete(id);
    }

};

export default new CategoryService();