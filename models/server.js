const cors = require("cors");
const express = require("express");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 8081;

    //middleware
    this.middlewares()

    //rutes
    this.userPath = '/api/user'

    this.routes();
  }

  middlewares() {
    this.app.use(cors())
    //parse body
    this.app.use(express.json())
    this.app.use(express.static('public'))
  }

  routes() {
    this.app.use(this.userPath, 
      require('../routes/user.routes'))
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("puerto ", this.port);
    });
  }
}

module.exports = Server;
