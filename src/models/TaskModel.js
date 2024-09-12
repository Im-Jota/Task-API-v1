const connection = require('../config/connection.js');

class TaskModel {
  constructor () {
    this._table = 'task';
  }

  getTasks (callback) {
    const select = `select * from ${this._table}`;
    connection.query(select, (error, data) => {
      if(error) {
        callback(error,  null)
      }
      callback(null, data);
    })
  }
}

module.exports = TaskModel;
