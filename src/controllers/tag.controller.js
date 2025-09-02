const { Tag, ItemTag } = require('../models');
const { Op } = require('sequelize');

async function addTagsToItem(req, res, next) {
  try {
    const { itemId } = req.params;
    const { tags } = req.body;

    if (!Array.isArray(tags) || tags.length === 0) {
      return res.status(400).json({ message: 'tags should be a non-empty array' });
    }

    const finalTags = [];

    for (let tagName of tags) {
      tagName = String(tagName).trim().toLowerCase();
      if (!tagName) continue; 

      let tag = await Tag.findOne({ where: { name: tagName } });

      if (!tag) {
        tag = await Tag.create({ name: tagName });
        console.log(`Created new tag: ${tagName}`);
      }

      const exists = await ItemTag.findOne({ where: { itemId, tagId: tag.id } });
      if (!exists) {
        await ItemTag.create({ itemId, tagId: tag.id });
      }

      finalTags.push(tag);
    }

    res.json({
      message: 'Tags successfully linked with item',
      tags: finalTags
    });

  } catch (err) {
    console.error('Error adding tags to item:', err);
    next(err);
  }
}


// Suggestion
async function suggestTags(req, res, next) {
  try {
    const query = req.query.q || '';
    if (!query.trim()) {
      return res.json([]);
    }

    const tagsFromDb = await Tag.findAll({
      where: {
        name: { [Op.iLike]: `${query}%` }
      },
      order: [['name', 'ASC']],
      limit: 10
    });

    res.json(tagsFromDb);
  } catch (err) {
    console.error('Error suggesting tags:', err);
    next(err);
  }
}

module.exports = { addTagsToItem, suggestTags };
