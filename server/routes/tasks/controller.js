const express = require("express");
const router = express.Router();

const Tasks = require("../../models/tasks");

/* GET home page. */

const getAllTask = async (req, res, next) => {
  const tasks = await Tasks.find({ uid: req.params.userid }).sort({
    time: "desc",
  });
  if (tasks) {
    res.status(200).send(tasks);
  } else {
    res.status(500).send({ error: "something Failed" });
  }
};

const newTask = async (req, res, next) => {
  const task = new Tasks({
    uid: req.body.uid,
    task: req.body.task,
    type: req.body.type,
    describe: req.body.describe,
  });
  const saved = await task.save();
  if (saved) {
    res.status(200).send(saved);
  } else {
    res.status(500).send({ error: "something Failed" });
  }
};

const getTask = async (req, res, next) => {
  const task = await Tasks.findOne({ _id: req.params.taskid });
  if (task) {
    res.status(200).send(task);
  } else {
    res.status(500).send({ error: "something Failed" });
  }
};

const updateTask = async (req, res, next) => {
 
  const task = await Tasks.findById(req.params.taskid);
  task.task = req.body.task;
  task.type = req.body.type;
  task.describe = req.body.describe;
  await task.save();
  if (task) {
    res.status(200).send(task);
  } else {
    res.status(500).send({ error: "something Failed" });
  }
};

const deleteTask = async (req, res, next) => {
  const deleted = await Tasks.findOneAndDelete({ _id: req.params.taskid });
  if (deleted) {
    res.status(200).send("deleted success");
  } else {
    res.status(500).send({ error: "something Failed" });
  }
};

module.exports = { newTask, getAllTask, getTask, updateTask, deleteTask };
