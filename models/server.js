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
    this.paths = {
      auth:'/api/auth',
      users:'/api/user',
      categories:'/api/categories',
      products:'/api/products',
      search:'/api/search'
    }


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
    this.app.use(this.paths.users, 
      require('../routes/user.routes'))
    this.app.use(this.paths.auth, 
      require('../routes/auth.routes'))
    this.app.use(this.paths.categories, 
      require('../routes/category.routes'))
    this.app.use(this.paths.products, 
      require('../routes/product.routes'))
    this.app.use(this.paths.search, 
      require('../routes/search.routes'))
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("puerto ", this.port);
    });
  }
}

module.exports = Server;
