const Joi = require('joi');
const {Task} = require('./../util/mongodb.util')
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
    const { error } = validateTask(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
    
    // Create task to add
    const task = {
        id: tasks.length,
        title: req.body.title,
        content: req.body.content,
        status: 'In progress',
        date_creation : new Date().toISOString(),
        update_date : new Date().toISOString()
    };

    // Add task
    tasks.push(task);

    // Send added task
    res.send(task);
});

/******** Put **********/
router.put('/updateTask/:id', (req, res) => {
    // Find task to update
    const task = tasks.find(c => c.id === parseInt(req.params.id));
    if (!task) return res.status(404).send('The task with the given ID was not found.');
  
    // Validate data to update
    const { error } = validateTask(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
    
    // New data
    task.title = req.body.title; 
    task.content = req.body.content; 
    task.update_date = new Date().toISOString();

    res.send(task);
});

router.put('/doneTask/:id', (req, res) => {
    // Find task to update
    const task = tasks.find(c => c.id === parseInt(req.params.id));
    if (!task) return res.status(404).send('The task with the given ID was not found.');
  
    // Validate data to update
    const { error } = validateTask(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
    
    // New data
    task.status = 'Done'; 
    task.update_date = new Date().toISOString();
    
    res.send(task);
});

/******** Delete **********/
router.delete('/deleteTask/:id', (req, res) => {
    const task = tasks.find(c => c.id === parseInt(req.params.id));
    if (!task) return res.status(404).send('The task with the given ID was not found.');
  
    const index = tasks.indexOf(task);
    tasks.splice(index, 1);
  
    res.send(task);
});

// Validate Task Schema
function validateTask(task) {

    const schema = Joi.object({
        title: Joi.string().min(3).required(),
        content : Joi.string().min(3).required(),
    });

    return schema.validate(task);
}

module.exports = router;