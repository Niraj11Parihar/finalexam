const mongoose = require('mongoose');

require('dotenv').config();

const url = process.env.DB_URL;
console.log(url);

mongoose.connect(url);
const db = mongoose.connection;

db.on("connected",()=>{
    console.log("Connected to db");
})
db.on("disconnected",()=>{
    console.log("Disconnected to db");
})
db.on("error",(error)=>{
    console.log("Unable to connect to DB"+error);
})

module.exports = db;