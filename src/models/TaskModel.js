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

  getTask (id, callback) {
    const select = `select * from ${this._table} where id = ${id}`;
    connection.query(select, (error, data) => {
      if(error) {
        callback(error, null);
      }
      callback(null, data);
    })
  }

  setTask (name, callback) {
    const insert = `insert into task (name, state, access, create_at, update_at, delete_at) values (?, ?, ?, ?, ?, ?)`;
    const date = new Date();
    connection.query(insert, [name, 0, 0, date, date, date], (error, data) => {
      if(error) {
        callback(error, null);
      }
      const { insertId } = data;
      this.getTask(insertId, (error, result) => {
        callback(null, result);
      })
    })
  }

  updateTask (id, name, state, callback) {
    const date = new Date();
    const update = `update ${this._table} set name = ?, state = ?, update_at = ?  where id = ${id}`;
    connection.query(update, [name, state, date], (error, result) => {
      if (error) {
        callback(error, null)
      }
      this.getTask(id, (error, result1) => {
        callback(null, result1);
      })
    })
  }

  deleteTask (id, callback) {
    const date = new Date();
    const del = `update ${this._table} set access = ?, delete_at = ? where id = ${id}`;
    connection.query(del, [1, date], (error, result) => {
      if(error) {
        callback(error, null);
      }
      callback(null, result);
    })
  }

  changeState (id, callback) {
    this.getTask(id, (error, result) => {
      const { state } = result;
    })
    const update = `update ${this._table} set state = ${state} where id = ${id}`;
    connection.query(update, (error, result1) => {
      if(error) {
        callback(error, null);
      }
      callback(null, result1);
    })
  }
}

module.exports = TaskModel;
