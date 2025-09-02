const { Inventory } = require('../models');

// Create
async function createInventory(req, res, next) {
  try {
    const { title, description, is_public } = req.body;
    if (!title) return res.status(400).json({ message: 'title is required' });

    const inventory = await Inventory.create({
      title,
      description,
      is_public: Boolean(is_public),
      creatorId: req.user?.id || null, 
    });

    res.status(201).json(inventory);
  } catch (err) {
    next(err);
  }
}

// List
async function getInventories(req, res, next) {
  try {
    const inventories = await Inventory.findAll();
    res.json(inventories);
  } catch (err) {
    next(err);
  }
}

// Update
async function updateInventory(req, res, next) {
  try {
    const { id } = req.params;
    const { title, description, is_public, version } = req.body;

    if (typeof version !== 'number') {
      return res.status(400).json({ message: 'version (number) is required' });
    }

    const [count] = await Inventory.update(
      { title, description, is_public, version: version + 1 },
      { where: { id, version } }
    );

    if (count === 0) {
      return res.status(409).json({ message: 'Conflict: inventory already updated' });
    }

    const updated = await Inventory.findByPk(id);
    res.json(updated);
  } catch (err) {
    next(err);
  }
}

// Delete
async function deleteInventory(req, res, next) {
  try {
    const { id } = req.params;
    await Inventory.destroy({ where: { id } });
    res.json({ message: 'Inventory deleted' });
  } catch (err) {
    next(err);
  }
}

module.exports = { createInventory, getInventories, updateInventory, deleteInventory };
