const {Task} = require('../util/db-tasks.util')
const express = require('express');
const router = express.Router();

// Tasks Array
const tasks = [
    {      
        id: 0, 
        title: 'Task 0',
        content : 'Go to the desired location, where you want to create a file.',
        status: 'In progress',
        date_creation : new Date('2018-09-22T15:00:00'),
        update_date : new Date('2018-09-22T15:00:00')
    },  
    {      
        id: 1, 
        title: 'Task 1',
        content : 'Go to the desired location, where you want to create a file.',
        status: 'In progress',
        date_creation : new Date("17/05/2023"),
        update_date : new Date("17/05/2023")
    }, 
    {      
        id: 2, 
        title: 'Task 2',
        content : 'Go to the desired location, where you want to create a file.',
        status: 'In progress',
        date_creation : new Date("17/06/2023"),
        update_date : new Date("17/06/2023")
    }
];

/******** Get  **********/

// Get all tasks
router.get('/allTasks', (req, res) => {
    Task.find()
        .then((result) => res.send(result))
        .catch((err) => res.status(400).send(err))
});

// Get specified Task ( using ID )
router.get('/taskByID/:id', (req, res) => {
    Task.findOne({'_id':req.params.id})
        .then((result) => res.send(result))
        .catch((err) => res.status(400).send(err))
});

/******** Post  **********/
router.post('/addTask', (req, res) => {

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
router.put('/updateTask/:id', (req, res) => {

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

router.put('/doneTask/:id', (req, res) => {

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
router.delete('/deleteTask/:id', (req, res) => {

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