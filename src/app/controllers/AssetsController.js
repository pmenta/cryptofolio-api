const AssetsRepository = require('../repositories/AssetsRepository');
const getTokenPrice = require('../requests/tokens');

class AssetsController {
  async index(request, response) {
    const wallet = await AssetsRepository.findAll();

    const assetsWithPrice = await Promise.all(
      wallet.map(async (asset) => {
        const token = asset.token_name;
        const price = await getTokenPrice(token);

        return { ...asset, amount_in_usd: Number(asset.amount) * price[token].usd };
      }),
    );

    response.json(assetsWithPrice);
  }

  async store(request, response) {
    const {
      amount, token_id,
    } = request.body;

    if (!token_id) {
      return response.status(400).json({ error: 'Token is required.' });
    }

    if (!amount) {
      return response.status(400).json({ error: 'Amount is required.' });
    }

    const assetExists = await AssetsRepository.findByTokenId(token_id);

    if (assetExists) {
      const asset = await AssetsRepository.update(assetExists.id, {
        amount: Number(assetExists.amount) + Number(amount),
      });
      return response.json(asset);
    }

    const asset = await AssetsRepository.create({
      token_id, amount,
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
