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

  getTask (req, res) {
    const id = req.url.split('/')[3];
    this._taskModel.getTask(id, (error, result) => {
      if(error) {
        console.log(error);
      }
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.end(JSON.stringify(result));
    })
  }

  setTask (req, res) {
    let buffer = '';
    req.on('data', (data) => {
      buffer += data.toString();
    })
    req.on('end', () => {
      const { name } = JSON.parse(buffer);
      this._taskModel.setTask(name, (error, result) => {
        if(error) {
          console.log(error);
        }
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.write(JSON.stringify(result));
        res.end();
      })
    })
  }

  deleteTask (req, res) {
    const id = req.url.split('/')[3];
    this._taskModel.deleteTask(id, (error, result) => {
      if(error) {
        console.log(error);
      }
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end('Deleted successfully');
    })
  }

  changeTask (req, res) {
    const id = req.url.split('/')[3];
    let buffer = '';
    req.on('data', (data) => {
      buffer += data.toString();
    })
    req.on('end', () => {
      const data = JSON.parse(buffer);
      if(Object.keys(data).length > 1) {
        const { name, state } = data;
        this._taskModel.updateTask(id, name, state, (error, result) => {
          if (error) {
            console.log(error);
          }
          res.statusCode = 200;
          res.setHeader('Content-Type', 'apllication/json');
          res.write(JSON.stringify(result));
          res.end();
        })
      }
    })
  }
}

module.exports = new TaskController();
