const { Comment } = require('../models');
const { getIO } = require('../socket');

async function addComment(req, res, next) {
  try {
    const { inventoryId, body } = req.body;
    if (!inventoryId || !body) {
      return res.status(400).json({ message: 'inventoryId and body required' });
    }

    const comment = await Comment.create({
      inventoryId,
      userId: req.user.id, 
      body
    });

    const io = getIO();
    io.to(inventoryId).emit('commentAdded', {
      id: comment.id,
      inventoryId,
      userId: comment.userId,
      body: comment.body,
      createdAt: comment.createdAt
    });

    res.status(201).json(comment);
  } catch (err) {
    next(err);
  }
}

async function getComments(req, res, next) {
  try {
    const { inventoryId } = req.params;
    const comments = await Comment.findAll({
      where: { inventoryId },
      order: [['createdAt', 'ASC']]
    });
    res.json(comments);
  } catch (err) {
    next(err);
  }
}

module.exports = { addComment, getComments };
