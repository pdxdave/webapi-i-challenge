// implement your API here

const express = require('express');

const db = require('./data/db');

const server = express();
server.use(express.json());

// GET all users
server.get('/api/users', (req, res) => {
    db.find()
    .then(allFriends => {
        res.json(allFriends);
    })
    .catch(({code, message}) => {
        res.status(code).json({err: message})
    })
});


// CREATE a user
server.post('/api/users', (req, res) => {
    const newUser = req.body;

    db.insert(newUser)
    .then(addedUser => {
        res.status(200).json(addedUser)
    })
    .catch(({code, message}) => {
        res.status(code).json({err: message})
    })
})