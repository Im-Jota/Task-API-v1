const TaskModel = require('../models/TaskModel.js');

class TaskController {
  constructor () {
    this._taskModel = new TaskModel();
  }

  getAllTasks (req, res) {
    this._taskModel.getTasks((error, result) => {
      if(error) {
        console.log(error);
      }

      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.write(JSON.stringify(result));
      res.end();
    })
  }
}

module.exports = new TaskController();
