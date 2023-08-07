const {User,validateUser} = require('../models/user.model');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const asyncMiddleware = require('../middleware/async.middleware');
const R = require('ramda');

/******** Get  **********/
// Get all users
router.get('/allUsers',async (req, res) => {
    throw new Error('could not get errors');
    const users = await User.find();
    res.send(users);
}); 

// Get specified User ( using ID )
router.get('/userById/:id', (req, res) => {

    User.findOne({'_id':req.params.id})
        .then((result) => res.send(result))
        .catch((err) => res.status(400).send(err))
});

// Get logged user but for security we will not use id but token
router.get('/loggedUser/',auth, (req, res) => {
    const id = req.user._id
    User.findOne({'_id':id})
        .then((result) => res.send(R.omit(['password','_id'],result)))
        .catch((err) => res.status(400).send(err))
});

/******** Post  **********/
router.post('/addUser', async (req, res) => {

    const {error} = validateUser(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({email:req.body.email})
    if(user) return res.status(400).send('User already exists');

    // Create user to add
    user = new User(R.pick(['name','email','password','isAdmin'],req.body));

    // Hashing Password before saving the user
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    user = await user.save()

    const token = user.generateAuthToken();

    res.header('x-auth-token',token).send(R.pick(['_id','name','email','isAdmin'],user));

});

module.exports = router;