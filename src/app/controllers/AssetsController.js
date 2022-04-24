const AssetsRepository = require('../repositories/AssetsRepository');

class AssetsController {
  async index(request, response) {
    const wallet = await AssetsRepository.findAll();

    response.json(wallet);
  }

  async store(request, response) {
    const {
      crypto, amount,
    } = request.body;

    if (!crypto) {
      return response.status(400).json({ error: 'Crypto is required.' });
    }

    if (!amount) {
      return response.status(400).json({ error: 'Amount is required.' });
    }

    const assetExists = await AssetsRepository.findByCrypto(crypto);

    if (assetExists) {
      const asset = await AssetsRepository.update(assetExists.id, {
        amount: Number(assetExists.amount) + Number(amount),
      });
      return response.json(asset);
    }

    const asset = await AssetsRepository.create({
      crypto, amount,
    });
    response.json(asset);
  }

  async update(request, response) {
    const { id } = request.params;
    const {
      amount,
    } = request.body;

    if (!amount) {
      return response.status(400).json({ error: 'Amount is required.' });
    }

    const assetExists = await AssetsRepository.findById(id);

    if (!assetExists) {
      return response.status(404).json({ error: 'Asset not found.' });
    }

    const asset = await AssetsRepository.update(id, {
      amount,
    });

    response.json(asset);
  }

  async delete(request, response) {
    const { id } = request.params;

    await AssetsRepository.delete(id);

    response.sendStatus(204);
  }
}

module.exports = new AssetsController();
