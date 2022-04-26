const TokensRepository = require('../repositories/TokensRepository');

class TokensController {
  async index(request, response) {
    const tokens = await TokensRepository.findAll();
    response.json(tokens);
  }

  async show(request, response) {
    const { id } = request.params;
    const token = await TokensRepository.findById(id);

    if (!token) {
      return response.status(404).json({ error: 'Token not found.' });
    }
    response.json(token);
  }

  async store(request, response) {
    const { id, name } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'Name is required.' });
    }

    if (!id) {
      return response.status(400).json({ error: 'ID is required.' });
    }

    const token = await TokensRepository.create({ id, name });

    response.json(token);
  }

  async update(request, response) {
    const { id } = request.params;
    const { name } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'Name is required.' });
    }

    const tokenExists = await TokensRepository.findById(id);

    if (!tokenExists) {
      return response.status(404).json({ error: 'Token not found.' });
    }

    const token = await TokensRepository.update(id, { name });

    response.json(token);
  }

  async delete(request, response) {
    const { id } = request.params;

    await TokensRepository.delete(id);

    response.sendStatus(204);
  }
}

module.exports = new TokensController();
