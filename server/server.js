//express set up and dependencies
const express = require('express');
const port = 3030;
const app = express();
const cors = require('cors');

//importing data access object
const dao = require('./dao');

//middleware...
app.use(cors());
app.use(express.json());


//test route
app.get('/api/test', (req, res) => {

    res.send('hi!');
})

//get all users (really more of a test route)
app.get('/api/users/', async (req, res) => {
   const users = await dao.getAllUsers()

   res.send(users);
})

//get user by id
app.get('/api/users/:id', async (req, res) => {
    const user = await dao.getUser(req.params.id)
    
    if (!user){
        res.statusCode(404).send('not found')
    }

    res.send(user)
})

//get comments by employee id (comments left BY users)
app.get('/api/comments/employee/:id', async (req, res) =>  {
    
    const comments = await dao.getCommentsByEmployeeId(req.params.id)

    res.send(comments)
})


//get comments by manager id (comments left FOR user)
app.get('/api/comments/manager/:id', async (req, res) =>  {
    
    const comments = await dao.getCommentsByManagerId(req.params.id)

    res.send(comments)
})

app.get('/api/comments/:id', async (req, res) => {
    const comment = await dao.getCommentByCommentId(req.params.id)

    res.send(comment)
})

//put "followup" onto comment by comment_id
app.put('/api/comments/:id', async (req, res) => {
   
    const message = req.body.message
    await dao.putFollowupByCommentId(req.params.id, message)

    res.sendStatus(204)
})

//post a new comment
app.post('/api/comments', async (req, res) => {
    
    //create a comment object using body of our request
    let comment = {comment : req.body.comment,
                    employee_id : req.body.user_id}

    //grab user from db to get manager_id...
    let user = await dao.getUser(req.body.user_id)
    
    //append manager_id
    comment.manager_id = user.manager_id;

    //do magic in db...
    await dao.postComment(comment)
    //profit
    res.sendStatus(201)
})

app.listen(port);