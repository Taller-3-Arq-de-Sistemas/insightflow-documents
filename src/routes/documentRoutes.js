const express = require('express');
const router = express.Router();
const documentController = require('../controllers/documentController');

router.post('/', (req, res) => documentController.create(req, res));
router.get('/:id', (req, res) => documentController.getOne(req, res));
router.patch('/:id', (req, res) => documentController.update(req, res));
router.delete('/:id', (req, res) => documentController.delete(req, res));

module.exports = router;