const express = require('express'); 

const actionRouter = require('./actionRouter')
const projectRouter = require('./projectRouter')

const server = express();

server.use(express.json());

server.use('/api/actions', actionRouter);
server.use('/api/projects', projectRouter);

server.get('/', (req, res) => {
  
    res.send(`
      <h2>Tay's API</h2>
      <p>Welcome to Tay's API</p>
      `);
  });


module.exports = server;