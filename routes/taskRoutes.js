const express = require('express');
const taskController = require('../controllers/taskController');
const authMiddleware = require('../utils/authMiddleware');
const Task = require('../models/task');
const NotificationService = require('../services/notificationService');
const SchedulerService = require('../services/schedulerService');

const router = express.Router();

// Create a task
router.post('/', authMiddleware,taskController.createTask);

// Get all tasks
router.get('/', authMiddleware, taskController.getAllTasks);

// Update a task
router.put('/:id', authMiddleware, taskController.updateTask);

// Delete a task
router.delete('/:id', authMiddleware, taskController.deleteTask);

module.exports = router;
