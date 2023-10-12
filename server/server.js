//express set up and dependencies
const express = require('express');
const port = 3030;
const app = express();
const cors = require('cors');
const { spawn } = require('child_process');

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

app.post('/predict', (req, res) => {
    const input = req.body;
    const message = req.body.message;
    
   
    // Spawn a child process to execute the predict.py script
    // The Python binary name might be different on your machine. Just "python" for example.
    const pythonScript = spawn('python', ['sentiment_analyzer.py']);

    // Send the data to the predict.py script via stdin
    pythonScript.stdin.write(message);
    pythonScript.stdin.end();

    let predictionData = '';

    // Collect the predicted data from stdout of the predict.py script
    pythonScript.stdout.on('data', (data) => {
        predictionData += data.toString();
    });

    //our python script isn't closing :( 
    // Handle the completion of the predict.py script
    pythonScript.on('close', (code) => {
        if (code === 0) {
            // Parse the predicted data
            const predictions = predictionData.toArray();
            console.log({predictions});

            // Return the predictions as the response
            res.send(predictions);
        } else {
            // Return an error response
            res.status(500).json({ error: 'Prediction failed' });
        }
    });
});





app.listen(port);