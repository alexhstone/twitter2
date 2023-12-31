//mongodb set up and dependencies
const { ObjectId, MongoClient } = require('mongodb');
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

//fetch comment by comment_id
const getCommentByCommentId = async function(id){
    const mongoId = new ObjectId(id)
    let db = await dbConnect();
    let comment = await db.collection("comments").findOne({'_id': mongoId});
    return comment;
}

//put
const putFollowupByCommentId = async function(id, message){
const mongoId = new ObjectId(id)
let db = await dbConnect();
await db.collection("comments").updateOne(
    {"_id": mongoId},
    {"$push": {"followups": message}});
};

const postComment = async function(comment){
    let db = await dbConnect();
    await db.collection("comments").insertOne(comment);
};
module.exports = { getAllUsers, getUser, getCommentsByEmployeeId, getCommentsByManagerId, putFollowupByCommentId, getCommentByCommentId, postComment}