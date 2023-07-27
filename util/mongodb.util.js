const mongoose = require('mongoose');

// Connection
mongoose.connect(process.env.DB_CONNECTION_URL)
    .then(() => console.log("connected to mongodb ..."))
    .catch((err) => console.error("can't connect ...",err))

// Collection Schema
const taskSchema = new mongoose.Schema({
    title: {type:String,require:true},
    content: {type:String,require:true},
    status: {type:String,enum:['In progress','Done'],require:true,default:'In progress'},
    date_creation : {type:Date,default:Date.now},
    update_date : {type:Date,default:Date.now}
});

const Task = mongoose.model('tasks',taskSchema);

module.exports.Task = Task;