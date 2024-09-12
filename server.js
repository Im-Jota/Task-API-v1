const http = require('http');

const app = require('./src/app.js');

const { host, port } = require('./src/config/config.js');

const server = http.createServer(app);

server.listen(port, host, (error) => {
  if(error) {
    console.log(error);
  }

  console.log(`Server On: http://${host}:${port}`);
})
