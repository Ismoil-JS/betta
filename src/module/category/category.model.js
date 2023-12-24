import { Postgres } from "../../postgres/postgres.js";

export class CategoryModel {
    #postgres;

    constructor() {
        this.#postgres = new Postgres();
    }

    async getAll() {
        const SQL = `SELECT id, name FROM category WHERE status = 'active'`;
        return await this.#postgres.fetch(SQL);
    }

    async getAllPaginated(page, limit) {
        const SQL = `SELECT id, name FROM category WHERE status = 'active' LIMIT $2 OFFSET $1`;
        return await this.#postgres.fetch(SQL, (page - 1) * limit, limit);
    }

    async getById(id) {
        const SQL = `SELECT id, name FROM category WHERE id = $1 AND status = 'active'`;
        return await this.#postgres.fetch(SQL, id);
    }

    async getByName(name) {
        const SQL = `SELECT * FROM category WHERE name = $1 AND status = 'active'`;
        return await this.#postgres.fetch(SQL, name);
    }

    async create(name) {
        const SQL = `INSERT INTO category (name) VALUES ($1) RETURNING *`;
        return await this.#postgres.fetch(SQL, name);
    }

    async update(id, name) {
        const SQL = `UPDATE category SET name = $2 WHERE id = $1 AND status = 'active' RETURNING *`;
        return await this.#postgres.fetch(SQL, id, name);
    }

    async delete(id) {
        const SQL = `UPDATE category SET status = 'inactive' WHERE id = $1 AND status = 'active' RETURNING *`;
        return await this.#postgres.fetch(SQL, id);
    }
};
