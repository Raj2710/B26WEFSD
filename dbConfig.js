const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
dbName='b26we';
const dbUrl = `mongodb+srv://Raj2710:Raj2710@raj.x3e0h.mongodb.net/${dbName}`
module.exports ={dbUrl,mongodb,MongoClient,dbName};