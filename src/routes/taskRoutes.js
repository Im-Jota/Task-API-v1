const taskController = require('../controllers/TaskController.js');

function taskRoutes (req, res) {
  if(req.url === '/api/tasks') {
    taskController.getAllTasks(req, res);
  }
}

module.exports = taskRoutes;
