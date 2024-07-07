const express = require('express');
const auth = require('../middleware/auth');
const Schedule = require('../models/Schedule');

const router = express.Router();

// Add Schedule
router.post('/', auth, async (req, res) => {
    const { name, date, sets } = req.body;

    try {
        const newSchedule = new Schedule({
            user: req.user.id,
            name,
            date,
            sets
        });

        const schedule = await newSchedule.save();
        res.json(schedule);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Get User Schedules
router.get('/', auth, async (req, res) => {
    try {
        const schedules = await Schedule.find({ user: req.user.id });
        res.json(schedules);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Update Schedule
router.put('/:id', auth, async (req, res) => {
    const { name, date, sets } = req.body;

    try {
        let schedule = await Schedule.findById(req.params.id);
        if (!schedule) {
            return res.status(404).json({ msg: 'Schedule not found' });
        }

        // Check user
        if (schedule.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        schedule = await Schedule.findByIdAndUpdate(req.params.id, { name, date, sets }, { new: true });
        res.json(schedule);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Delete Schedule
router.delete('/:id', auth, async (req, res) => {
    try {
        let schedule = await Schedule.findById(req.params.id);
        if (!schedule) {
            return res.status(404).json({ msg: 'Schedule not found' });
        }

        // Check user
        if (schedule.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        await Schedule.findByIdAndRemove(req.params.id);
        res.json({ msg: 'Schedule removed' });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Get Schedule Progress
router.get('/progress', auth, async (req, res) => {
    try {
        const schedules = await Schedule.find({ user: req.user.id }).sort({ date: 1 });

        // Group schedules by date
        const progress = schedules.reduce((acc, schedule) => {
            const date = schedule.date.toISOString().split('T')[0];
            if (!acc[date]) {
                acc[date] = [];
            }
            acc[date].push({
                name: schedule.name,
                sets: schedule.sets
            });
            return acc;
        }, {});

        res.json(progress);
    } catch (err) {
        console.error('Server error:', err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
