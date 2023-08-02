const {User,validateUserLogin} = require('../models/user.model');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const R = require('ramda');

router.post('/', async (req, res) => {

    const {error} = validateUserLogin(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({email:req.body.email})
    if(!user) return res.status(400).send('Invalid email or password.');

    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if(!validPassword) return res.status(400).send('Invalid email or password.');

    res.send('Welcome');

});

module.exports = router;