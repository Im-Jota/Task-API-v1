const fs = require('fs');
const path = require('path');

const taskRoutes = require('./routes/taskRoutes.js');

function app (req, res) {
  if(req.url === '/') {
    const url = path.join(__dirname, 'views', 'index.html');
    fs.readFile(url, (error, data) => {
      if(error) {
        console.log(error);
      }
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html');
      res.write(data);
      res.end();
    })
  } else if (req.url.startsWith('/public/') ){
    const url = path.join(__dirname, req.url);
    const extName = path.extname(url);
    let contentType = '';
    switch (extName) {
      case '.css':
        contentType = 'text/css';
        break;
    }
    fs.readFile(url, (error, data) => {
      if(error) {
        console.log(error);
      }
      res.writeHead(200, {'Content-Type':contentType});
      res.end(data);
    })
  } else if (req.url.startsWith('/api/')) {
    const type = req.url.split('/')[2];
    switch (type) {
      case 'tasks':
        taskRoutes(req, res);
    }
  }
}

module.exports = app;
