const express = require('express');
const inventoryController = require('../controllers/inventory.controller');
const router = express.Router();

router.post('/', inventoryController.createInventory);
router.get('/', inventoryController.getInventories);
router.put('/:id', inventoryController.updateInventory);
router.delete('/:id', inventoryController.deleteInventory);

module.exports = router;
