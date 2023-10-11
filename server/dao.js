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
const getAllUsers = async function(){
    let db = await dbConnect();
    let allUsers = await db.collection("users").find({}).toArray();
    return allUsers;
}

//fetch user by id
const getUser = async function(id){
    let db = await dbConnect();
    let user = await db.collection("users").findOne({'user_id': id});
    return user;
}

//fetch comments by employee_id
const getCommentsByEmployeeId = async function(id){
    let db = await dbConnect();
    let comment = await db.collection("comments").find({'employee_id': id}).toArray();
    return comment;
}
//fetch comments by manager_id
const getCommentsByManagerId = async function(id){
    let db = await dbConnect();
    let comment = await db.collection("comments").find({'manager_id': id}).toArray();
    return comment;
}
module.exports = { getAllUsers, getUser, getCommentsByEmployeeId, getCommentsByManagerId }