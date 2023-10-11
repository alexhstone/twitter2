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


app.listen(port);