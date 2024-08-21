const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: String,
    description: String,
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    dueDate: Date,
    isRecurring: Boolean,
    recurringInterval: String, // e.g., 'daily', 'weekly', 'monthly'
    status: { type: String, enum: ['pending', 'in-progress', 'completed'], default: 'pending' }
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);
