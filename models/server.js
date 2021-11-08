const cors = require("cors");
const express = require("express");
const { dbConnection } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 8081;
    
    //db
    this.connectDB()

    //middleware
    this.middlewares()

    //rutes
    this.userPath = '/api/user'

    this.routes();
  }

  async connectDB() {
    await dbConnection()
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
