const { Journal } = require('../models');

exports.saveJournal = async (req, res) => {

  try {

    const userId = req.user.id;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const {
      thought,
      stress,
      comfort,
      selfNeed,
      selfAdvice,
      anxiety,
      control,
      strength,
      support,
      freeText
    } = req.body;

    // 🔥 check if journal already exists today
    let journal = await Journal.findOne({
      where: {
        userId,
        day: today
      }
    });

    if (journal) {

      // UPDATE existing
      await journal.update({
        thought,
        stress,
        comfort,
        selfNeed,
        selfAdvice,
        anxiety,
        control,
        strength,
        support,
        freeText
      });

    } else {

      // CREATE new
      journal = await Journal.create({
        userId,
        day: today,
        thought,
        stress,
        comfort,
        selfNeed,
        selfAdvice,
        anxiety,
        control,
        strength,
        support,
        freeText
      });
    }

    return res.status(200).json(journal);

  } catch (error) {

    return res.status(500).json({ message: error.message });
  }
};
exports.getTodayJournal = async (req, res) => {

  try {

    const userId = req.user.id;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const journal = await Journal.findOne({
      where: {
        userId,
        day: today
      }
    });

    return res.json(journal || {});

  } catch (error) {

    return res.status(500).json({ message: error.message });
  }
};
exports.getJournalHistory = async (req, res) => {

  try {

    const userId = req.user.id;

    const journals = await Journal.findAll({
      where: { userId },
      order: [['day', 'DESC']]
    });

    return res.json(journals);

  } catch (error) {

    return res.status(500).json({ message: error.message });
  }
};
