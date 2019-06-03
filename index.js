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

// DELETE a user
server.delete('/api/users/:id', (req, res) => {
    const {id} = req.params

    db.remove(id)
    .then(removedUser => {
        if(removedUser){
            res.json(removedUser)
        }else{
            res.status(404).json({err: 'Failed process.  Check id'})
        }
    })
    .catch(({code, message}) => {
        res.status(code).json({err: message})
    })
})

// UPDATE a user
server.put('/api/users/:id', (req, res) => {
    const {id} = req.params
    const user = req.body

    db.update(id, user)
    .then(updateUser => {
        if(updateUser){
            res.json(updateUser)
        }else{
            res.status(404).json({err: 'Failed to update user'})
        }
    })
    .catch(({code, message}) => {
        res.status(code).json({err: message})
    })
})