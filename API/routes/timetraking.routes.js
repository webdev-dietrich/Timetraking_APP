module.exports = (app) => {
    const TimetrackingController = require("../controllers/timetraking.controller");
    const router = require('express').Router();
  
    router.get('/', TimetrackingController.getAllTime);
    router.get('/:userId', TimetrackingController.getAllTimeByUser);
    router.post('/:userId', TimetrackingController.setTimeByUser);
    router.put('/:userId/:entryId', TimetrackingController.updateTimeByUser);
    router.get('/:userId/latest', TimetrackingController.getTimeByUserLastEntry);
  
    app.use('/api/timetracking', router);
  };