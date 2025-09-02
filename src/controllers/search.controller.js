const { Item, Tag } = require('../models');
const { Op } = require('sequelize');

async function searchItems(req, res, next) {
  try {
    const { inventoryId, q, tag } = req.query;

    if (!inventoryId) {
      return res.status(400).json({ message: 'inventoryId is required for search' });
    }

    const where = { inventoryId };

    if (q && q.trim()) {
      where[Op.or] = [
        { name: { [Op.iLike]: `%${q}%` } },
        { description: { [Op.iLike]: `%${q}%` } }
      ];
    }

    const include = [];

    if (tag && tag.trim()) {
      include.push({
        model: Tag,
        where: { name: { [Op.iLike]: tag.toLowerCase() } },
        through: { attributes: [] }
      });
    } else {
      include.push({
        model: Tag,
        through: { attributes: [] }
      });
    }

    const results = await Item.findAll({ where, include });

    if (results.length === 0) {
      console.log(`No items found for query: ${q || 'none'} and tag: ${tag || 'none'}`);
    }

    res.json(results);

  } catch (err) {
    console.error('Error searching items:', err);
    next(err);
  }
}

module.exports = { searchItems };
