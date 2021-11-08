// getting-started.js
const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_ATLAS, {
            // @ts-ignore
            useNewUrlParser: true,
            useUnifiedTopology: true,
            //useCreateIndex: true,
            //useFindAndModify: false,
        })
        console.info("base de datos online");
    } catch (error) {
        console.error(error)
        throw new Error('Error en base de datos')
    }
}


module.exports = {
    dbConnection
}