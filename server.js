const path = require("path")
const filePath = path.resolve(process.cwd() + "/config/.env")
require('dotenv').config({path: filePath})

// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

//Dependencies
const bodyParser = require('body-parser');
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));
// Spin up the server
// Setup Server
// const port = 8080;
const port = process.env.PORT || 8080;
const server = app.listen (port, listening);
// Callback to debug
 function listening () {
    console.log('server running');
    console.log(`running on localhost: ${port}`);
 };

// Post Route
//create post() with a url path and a callback function
app.post('/add', (req, res) => {
  //code to add data to endpoint object
  projectData['date'] = req.body.date;
  projectData['temp'] = req.body.temp;
  // projectData['content'] = req.body.content;
  res.send(projectData);
  console.log(projectData);
});

// GET Route
app.get('/all', (req, res) => {
  //code to send data of endpoint object
  res.send(projectData);
  console.log(projectData);
});

// GET api key
app.get('/api', (req, res) => {
  res.send(`${process.env.API_KEY}`);
});

// console.log(`API KEY is: ${process.env.API_KEY}`);
// console.log(`FullName is: ${process.env.FIRST_NAME} ${process.env.LAST_NAME}`);