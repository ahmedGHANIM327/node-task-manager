const {Task} = require('../models/task.model')
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware')
const authAdmin = require('../middleware/admin.middleware')

/******** Get  **********/
// Get all tasks
router.get('/allTasks',auth, async (req, res) => {

    const tasks = await Task.find();

    res.send(tasks);
}); 

// Get specified Task ( using ID )
router.get('/taskByID/:id',auth, (req, res) => {
    Task.findOne({'_id':req.params.id})
        .then((result) => res.send(result))
        .catch((err) => res.status(400).send(err))
});

/******** Post  **********/
router.post('/addTask',auth,authAdmin, (req, res) => {

    // Create task to add
    const task = {
        title: req.body.title,
        content: req.body.content,
    };

    Task.create(task)
        .then((result) => res.send(result))
        .catch((err) => res.status(400).send(err))

});

/******** Put **********/
router.put('/updateTask/:id',auth,authAdmin, (req, res) => {

    const updatedTask = {
        title : req.body.title,
        content : req.body.content,
        update_date : new Date().toISOString()
    };

    Task.findByIdAndUpdate(req.params.id,updatedTask,{ new: true })
        .then((result) => {
            if(result)
            {
                res.send(result);
            } else {
                res.status(404).send('No document founded or no changes made');
            }
        })
        .catch((err) => res.status(400).send(err));

});

router.put('/doneTask/:id',auth,authAdmin, (req, res) => {

    const updatedTask = {
        status : 'Done',
        update_date : new Date().toISOString()
    };

    Task.findByIdAndUpdate(req.params.id,updatedTask,{ new: true })
        .then((result) => {
            if(result)
            {
                res.send(result);
            } else {
                res.status(404).send('No document founded or no changes made');
            }
        })
        .catch((err) => res.status(400).send(err));
});

/******** Delete **********/
router.delete('/deleteTask/:id',auth,authAdmin, (req, res) => {

    Task.findByIdAndRemove(req.params.id)
        .then((result) => {
            if(result)
            {
                res.send(result);
            } else {
                res.status(404).send('No document founded or no changes made');
            }
        })
        .catch((err) => res.status(400).send(err));
});

module.exports = router;