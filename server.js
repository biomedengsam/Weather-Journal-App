// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
const { Console } = require('console');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const PORT = 5000;
const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

/*Respond with JS object when
a GET request is made to the homepage*/
const sendData = (req, res) => {
  res.send(projectData);
  console.log(projectData);
};
app.get('/all', sendData);

// POST method route
const add = (req, res) => {
  projectData['temperature'] = req.body.temperature;
  projectData['city'] = req.body.city;
  projectData['userResponse'] = req.body.userResponse;
  projectData['date'] = req.body.date;
  res.send(projectData);
  // console.log(projectData);
}
app.post('/add', add);