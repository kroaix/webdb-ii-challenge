const server = require('./api/server.js');

const port = process.env.port || 4000;

server.listen(port, () => {
  console.log(`=== listening on port ${port} ===`)
})