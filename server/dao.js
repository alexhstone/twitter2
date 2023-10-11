//mongodb set up and dependencies
const { MongoClient } = require('mongodb');
const dbUrl = "mongodb://127.0.0.1:27017";
const dbName = "twitter2";

/*
const sample = () => {
    return history;
}
*/

async function dbConnect(){
    let client = new MongoClient(dbUrl);
    await client.connect();
    let db = client.db(dbName);
    return db;
}

//fetch all users
const getAllUsers = async function(callback){
    let db = await dbConnect();
    let dataPromise = db.collection("users").find({}).toArray();
    dataPromise.then((users) => callback(users));
}

//fetch user by id
const getUser = async function(id, callback){
    let db = await dbConnect();
    let dataPromise = db.collection("users").findOne({'user_id': id});
    dataPromise.then((users) => callback(users));
}

module.exports = { getAllUsers, getUser }