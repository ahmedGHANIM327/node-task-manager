const mongoose = require('mongoose');

// Connection
mongoose.connect(process.env.DB_CONNECTION_URL)
    .then(() => console.log("connected to mongodb ..."))
    .catch((err) => console.error("can't connect ...",err))

// Collection Schema
const taskSchema = new mongoose.Schema({
    title: {type:String,require:true,minlength: 4},
    content: {type:String,require:true,minlength: 4},
    status: {type:String,enum:['In progress','Done'],require:true,default:'In progress'},
    date_creation : {type:Date,default:Date.now},
    update_date : {type:Date,default:Date.now}
});

taskSchema.set('validateBeforeSave', true);

const Task = mongoose.model('tasks',taskSchema);

module.exports.Task = Task;