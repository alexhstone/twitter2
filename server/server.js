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



app.listen(port);