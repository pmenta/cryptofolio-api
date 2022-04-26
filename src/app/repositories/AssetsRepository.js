const db = require('../../database');

class AssetsRepository {
  async findAll() {
    const rows = await db.query(`
      SELECT assets.*, tokens.name AS token_name
      FROM assets
      LEFT JOIN tokens ON tokens.id = assets.token_id
    `);
    return rows;
  }

  async findById(id) {
    const [row] = await db.query(`
      SELECT assets.*, tokens.name AS category_name
      FROM assets
      LEFT JOIN tokens ON tokens.id = assets.token_id
      WHERE assets.id = $1
    `, [id]);
    return row;
  }

  async findByTokenId(tokenId) {
    const [row] = await db.query(`
      SELECT assets.*, tokens.name AS token_name
      FROM assets
      LEFT JOIN tokens ON tokens.id = assets.token_id
      WHERE token_id = $1
    `, [tokenId]);

    return row;
  }

  async create({
    token_id, amount,
  }) {
    const [row] = await db.query(`
      INSERT INTO assets(token_id, amount)
      VALUES($1, $2)
      RETURNING *
    `, [token_id, amount]);

    return row;
  }

  async update(id, {
    amount,
  }) {
    const [row] = await db.query(`
      UPDATE assets
      SET amount = $1
      WHERE id = $2
      RETURNING *
    `, [amount, id]);
    return row;
  }

  async delete(id) {
    const deleteOp = await db.query('DELETE FROM assets WHERE id = $1', [id]);
    return deleteOp;
  }
}

module.exports = new AssetsRepository();
