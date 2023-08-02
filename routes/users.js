const {User,validateUser} = require('../models/user.model');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const R = require('ramda');

/******** Get  **********/
// Get all users
router.get('/allUsers',async (req, res) => {
    const users = await User.find();
    res.send(users);
}); 

// Get specified User ( using ID )
router.get('/userById/:id', (req, res) => {

    User.findOne({'_id':req.params.id})
        .then((result) => res.send(result))
        .catch((err) => res.status(400).send(err))
});

/******** Post  **********/
router.post('/addUser', async (req, res) => {

    const {error} = validateUser(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({email:req.body.email})
    if(user) return res.status(400).send('User already exists');

    // Create user to add
    user = new User(R.pick(['name','email','password'],req.body));

    // Hashing Password before saving the user
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    user = await user.save()

    res.send(R.pick(['_id','name','email'],user));

});

module.exports = router;