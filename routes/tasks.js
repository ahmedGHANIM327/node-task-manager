const Joi = require('joi');
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
    res.send(tasks);
});

// Get specified Task ( using ID )
router.get('/taskByID/:id', (req, res) => {
    const task = tasks.find(c => c.id === parseInt(req.params.id));
    if (!task) return res.status(404).send('The task with the given ID was not found.');
    res.send(task);
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

// Validate Task Schema
function validateTask(task) {

    const schema = Joi.object({
        title: Joi.string().min(3).required(),
        content : Joi.string().min(3).required(),
    });

    return schema.validate(task);
}

module.exports = router;