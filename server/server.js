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