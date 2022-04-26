const db = require('../../database');

class TokensRepository {
  async findAll() {
    const rows = await db.query('SELECT * FROM tokens ORDER BY name');
    return rows;
  }

  async findById(id) {
    const [row] = await db.query('SELECT * FROM tokens WHERE id = $1', [id]);
    return row;
  }

  async create({ id, name }) {
    const [row] = await db.query(`
      INSERT INTO tokens(id, name)
      VALUES($1, $2)
      RETURNING *
    `, [id, name]);
    return row;
  }

  async update(id, { name }) {
    const [row] = await db.query(`
      UPDATE tokens
      SET name = $1
      WHERE id = $2
      RETURNING *
    `, [name, id]);

    return row;
  }

  async delete(id) {
    const deleteOp = await db.query('DELETE FROM tokens WHERE id = $1', [id]);
    return deleteOp;
  }
}

module.exports = new TokensRepository();
