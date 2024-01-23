const db = require("../models");
const Timetracking = db.timetrackings;

const getAllTime = async (req, res) => {
  try {
    const allTime = await Timetracking.findAll();
    res.json(allTime);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

const getAllTimeByUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const userTime = await Timetracking.findAll({ where: { user_id: userId } });

    if (userTime.length === 0) {
      res.json([]);
    } else {
      res.json(userTime);
    }

  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

const getTimeByUserLastEntry = async (req, res) => {
    const { userId } = req.params;
  
    try {
      const lastEntry = await Timetracking.findOne({
        where: {
          user_id: userId,
          tracking_stop: null,
        },
        order: [['tracking_start', 'DESC']],
      });
  
      res.json(lastEntry);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  };

const setTimeByUser = async (req, res) => {
  const { userId } = req.params;
  const { tracking_start } = req.body;

  try {  
    const newTimeEntry = await Timetracking.create({
      user_id: userId,
      tracking_start,
    });

    res.json(newTimeEntry);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

const updateTimeByUser = async (req, res) => {
  const { entryId } = req.params;
  const { tracking_stop } = req.body;

  try {
    const timeEntry = await Timetracking.findByPk(entryId);

    if (!timeEntry) {
      res.status(404).send('Time entry not found');
      return;
    }

    timeEntry.tracking_stop = tracking_stop;

    await timeEntry.save();

    res.json(timeEntry);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = {
  getAllTime,
  getAllTimeByUser,
  setTimeByUser,
  updateTimeByUser,
  getTimeByUserLastEntry,
};
