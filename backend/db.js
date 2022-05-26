const mongoose = require('mongoose')

URI = "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false"

const createConnection = ()=>{
    mongoose.connect(URI, ()=>{
        console.log("Connected Successfully to Mongodb");
    });
}

module.exports = createConnection