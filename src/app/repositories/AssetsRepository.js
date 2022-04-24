const db = require('../../database');

class AssetsRepository {
  async findAll() {
    const rows = await db.query(`
      SELECT assets.*
      FROM assets
    `);
    return rows;
  }

  async findById(id) {
    const [row] = await db.query(`
      SELECT assets.*
      FROM assets
      WHERE assets.id = $1
    `, [id]);
    return row;
  }

  async findByCrypto(crypto) {
    const [row] = await db.query(`
      SELECT * FROM assets WHERE crypto = $1
    `, [crypto]);

    return row;
  }

  async create({
    crypto, amount,
  }) {
    const [row] = await db.query(`
      INSERT INTO assets(crypto, amount)
      VALUES($1, $2)
      RETURNING *
    `, [crypto, amount]);

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
