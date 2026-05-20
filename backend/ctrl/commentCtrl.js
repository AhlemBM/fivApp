const { Comment } = require('../models');

// CREATE COMMENT
exports.createComment = async (req, res) => {

  try {

    const userId = req.user.id;

    const { content, cycleId, appointmentId } = req.body;

    const comment = await Comment.create({
      userId,
      content,
      cycleId,
      appointmentId
    });

    return res.status(201).json(comment);

  } catch (error) {

    return res.status(500).json({ message: error.message });
  }
};

// GET COMMENTS
exports.getComments = async (req, res) => {

  try {

    const comments = await Comment.findAll({
      include: ['user'],
      order: [['createdAt', 'DESC']]
    });

    return res.json(comments);

  } catch (error) {

    return res.status(500).json({ message: error.message });
  }
};

// DELETE COMMENT
exports.deleteComment = async (req, res) => {

  try {

    const comment = await Comment.findByPk(req.params.id);

    if (!comment) {
      return res.status(404).json({ message: 'Not found' });
    }

    await comment.destroy();

    return res.json({ message: 'Deleted' });

  } catch (error) {

    return res.status(500).json({ message: error.message });
  }
};
