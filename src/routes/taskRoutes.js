const taskController = require('../controllers/TaskController.js');

function taskRoutes (req, res) {
  const method = req.method;
  if(req.url === '/api/tasks') {
    switch (method) {
      case 'GET':
        taskController.getAllTasks(req, res);
        break;
      case 'POST':
        taskController.setTask(req, res);
        break;
    }
  } else if(req.url.startsWith('/api/tasks/')) {
    switch (method) {
      case 'GET':
        taskController.getTask(req, res);
        break;
      case 'DELETE':
        taskController.deleteTask(req, res);
        break;
      case 'PUT':
        taskController.udpateTask(req, res);
        break;
      case 'PATCH':
        taskController.changeTask(req, res);
        break;
    }
  }
}

module.exports = taskRoutes;
