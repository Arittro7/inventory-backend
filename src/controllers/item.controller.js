const { Item, Inventory, Tag} = require('../models');
const { generateCustomId } = require('../utils/idGenerator');


let sequenceNumber = 1;

// Create
async function createItem(req, res, next) {
  try {
    const { inventoryId, name, description, price } = req.body;

    if (!inventoryId || !name) {
      return res.status(400).json({ message: 'inventoryId and name are required' });
    }

    
    const inv = await Inventory.findByPk(inventoryId);
    if (!inv) return res.status(404).json({ message: 'Inventory not found' });

    const custom_id = generateCustomId('ELC', sequenceNumber++); 

    const item = await Item.create({
      inventoryId,
      custom_id,
      name,
      description,
      price,
      inStock: true
    });

    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
}

async function getItems(req, res, next) {
  try {
    const { inventoryId } = req.params;
    const items = await Item.findAll({
      where: { inventoryId },
      include: [{ model: Tag, through: { attributes: [] } }]
    });
    res.json(items);
  } catch (err) {
    next(err);
  }
}

async function updateItem(req, res, next) {
  try {
    const { id } = req.params;
    const { name, description, price, inStock, version } = req.body;

    if (typeof version !== 'number') {
      return res.status(400).json({ message: 'version (number) is required' });
    }

    const [count] = await Item.update(
      { name, description, price, inStock, version: version + 1 },
      { where: { id, version } }
    );

    if (count === 0) {
      return res.status(409).json({ message: 'Conflict: item already updated' });
    }

    const updated = await Item.findByPk(id);
    res.json(updated);
  } catch (err) {
    next(err);
  }
}

// Delete
async function deleteItem(req, res, next) {
  try {
    const { id } = req.params;
    await Item.destroy({ where: { id } });
    res.json({ message: 'Item deleted' });
  } catch (err) {
    next(err);
  }
}

module.exports = { createItem, getItems, updateItem, deleteItem };
