const mongoose = require('mongoose');

const ScheduleSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    date: { type: Date, required: true },
    sets: [
        {
            count: { type: Number, required: true },
            weight: { type: Number, required: true }
        }
    ]
});

module.exports = mongoose.model('Schedule', ScheduleSchema);
