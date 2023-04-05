const mongoose = require('mongoose');


const TaskSchema = new mongoose.Schema({
    task: {
        type: String,
        require: true
    },
    status: {
        type: String
    }
})




const Todo = mongoose.model("todo", TaskSchema)
module.exports = Todo;
