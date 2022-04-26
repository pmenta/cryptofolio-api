const { Router } = require('express');

const AssetsController = require('./app/controllers/AssetsController');
const TokensController = require('./app/controllers/TokensController');

const router = Router();

router.get('/assets', AssetsController.index);
router.post('/assets', AssetsController.store);
router.put('/assets/:id', AssetsController.update);
router.delete('/assets/:id', AssetsController.delete);

router.get('/tokens', TokensController.index);
router.post('/tokens', TokensController.store);
router.put('/tokens/:id', TokensController.update);
router.delete('/tokens/:id', TokensController.delete);

module.exports = router;
