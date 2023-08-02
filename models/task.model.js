const mongoose = require('mongoose');

// Collection Schema
const taskSchema = new mongoose.Schema({
    title: {type:String,required:true,minlength: 4},
    content: {type:String,required:true,minlength: 4},
    status: {type:String,enum:['In progress','Done'],required:true,default:'In progress'},
    date_creation : {type:Date,default:Date.now},
    update_date : {type:Date,default:Date.now}
});

taskSchema.set('validateBeforeSave', true);

const Task = mongoose.model('tasks',taskSchema);

module.exports.Task = Task;