const cron = require('node-cron');
const Task = require('../models/task');
const NotificationService = require('./notificationService');

exports.scheduleRecurringTask = (task) => {
    let cronExpression;

    switch (task.recurrenceInterval) {
        case 'daily':
            cronExpression = '0 0 * * *';
            break;
        case 'weekly':
            cronExpression = '0 0 * * 0';
            break;
        case 'monthly':
            cronExpression = '0 0 1 * *';
            break;
        default:
            return;
    }

    cron.schedule(cronExpression, async () => {
        
        const newTask = new Task({
            title: task.title,
            description: task.description,
            assignedTo: task.assignedTo,
            createdBy: task.createdBy,
            dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // example: 7 days later
            isRecurring: true,
            recurrenceInterval: task.recurrenceInterval,
        });
       
        await newTask.save();

        NotificationService.notifyUser(newTask.assignedTo, `A recurring task has been created: ${newTask.title}`);
    });
};      
