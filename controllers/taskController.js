const Task = require('../models/task');
const NotificationService = require('../services/notificationService');
const SchedulerService = require('../services/schedulerService');

// Create a task
exports.createTask = async (req, res) => {
    try {
        const { title, description, assignedTo, dueDate, isRecurring, recurrenceInterval } = req.body;
        const task = new Task({
            title,
            description,
            assignedTo,
            createdBy: req.user._id,
            dueDate,
            isRecurring,
            recurrenceInterval
        });
        await task.save();
        // console.log("Task Created Sucessfully");
        // console.log("Assigned To ", assignedTo);

        NotificationService.notifyUser(assignedTo, `You have been assigned a new task: ${title}`);
        if (isRecurring) {
            SchedulerService.scheduleRecurringTask(task);
            // console.log("Called")
        }
        res.status(201).json({ message: 'Task created successfullyyyy ', task, assignedTo: assignedTo });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all tasks
exports.getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find().populate('assignedTo createdBy');
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a task
exports.updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        const task = await Task.findByIdAndUpdate(id, updates, { new: true });
        res.json({ message: 'Task updated successfully', task });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a task
exports.deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        await Task.findByIdAndDelete(id);
        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
