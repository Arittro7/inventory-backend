const express = require('express');
const itemController = require('../controllers/item.controller');
const router = express.Router();

router.post('/', itemController.createItem);
router.get('/:inventoryId', itemController.getItems);
router.put('/:id', itemController.updateItem);
router.delete('/:id', itemController.deleteItem);

module.exports = router;
