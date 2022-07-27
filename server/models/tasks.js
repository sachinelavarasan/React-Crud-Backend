const mongoose = require("mongoose");


const taskSchema = new mongoose.Schema({
    uid:{
        type:String,
        max:255,
        required:true
    },
    task:{
        type:String,
        max:255,
        required:true
    },
    type:{
        type:String,
        max:255,
        required:true
    },
    describe:{
        type:String,
        max:255,
        required:true
    },
    time:{
        type:Date,
        default:()=>Date.now()
    }
});

const Task = mongoose.model("Task",taskSchema);

module.exports = Task;