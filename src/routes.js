const { Router } = require('express');

const AssetsController = require('./app/controllers/AssetsController');

const router = Router();

router.get('/assets', AssetsController.index);
router.post('/assets', AssetsController.store);
router.put('/assets/:id', AssetsController.update);
router.delete('/assets/:id', AssetsController.delete);

module.exports = router;
