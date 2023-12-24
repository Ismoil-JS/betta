import { Postgres } from "../../postgres/postgres.js";

export class ProductModel {
    #postgres;

    constructor() {
        this.#postgres = new Postgres();
    }

    async getAll() {
        const SQL = `SELECT id, name, price, image, category_id FROM product WHERE status = 'active'`;
        return await this.#postgres.fetch(SQL);
    }

    async getAllPaginated(page, limit) {
        const SQL = `SELECT id, name, price, image, category_id FROM product WHERE status = 'active' LIMIT $2 OFFSET $1`;
        return await this.#postgres.fetch(SQL, (page - 1) * limit, limit);
    }

    async getById(id) {
        const SQL = `SELECT id, name, price, image, category_id FROM product WHERE id = $1 AND status = 'active'`;
        return await this.#postgres.fetch(SQL, id);
    }

    async getByCategory(category_id) {
        const SQL = `SELECT id, name, price, image, category_id FROM product WHERE category_id = $1 AND status = 'active'`;
        return await this.#postgres.fetch(SQL, category_id);
    }

    async create({name, price, image, category_id}) {
        const SQL = `INSERT INTO product (name, price, image, category_id) VALUES ($1,$2, $3, $4) RETURNING *`;
        return await this.#postgres.fetch(SQL, name, price, image, category_id);
    }

    async update(id, name, price, image, category_id) {
        const product = await this.getById(id);
    
        const SQL = `UPDATE product 
                        SET name = $1,
                            price = $2,
                            image = $3,
                            category_id = $4
                        WHERE id = $5
                            AND status = 'active' 
                        RETURNING *`;
        
        return await this.#postgres.fetch(SQL, 
            name ?? product[0].name, 
            price ?? product[0].price, 
            image ?? product[0].image, 
            category_id ?? product[0].category_id,
            id);
    }
    

    async delete(id) {
        const SQL = `UPDATE product SET status = 'inactive' WHERE id = $1 AND status = 'active' RETURNING *`;
        return await this.#postgres.fetch(SQL, id);
    }
};
