// Defines several CRUD (Create, Read, Update, Delete) operations for 'goals'

// This is a utility function that wraps an asynchronous route handler and catches any errors that might occur during the execution of asynchronous code
const asyncHandler = require('express-async-handler')

// Mongoose model for goal and user, used to interact with MongoDB database
const Goal = require('../models/goalModel')
const User = require('../models/userModel')

const getPublicGoals = asyncHandler(async (req, res) => {
    try {
        // Retrieve up to 10 public goals ordered by last-modified date
        const publicGoals = await Goal.find({ isPrivate: false })
            .sort({ lastModified: -1 })
            .limit(10);

        res.status(200).json(publicGoals);
    } catch (error) {
        console.error('Error in getPublicGoals:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// READ
// @desc    Get goals
// @route   GET /api/goals
// @access  Private
const getGoals = asyncHandler(async (req, res) => {     // using express async handler
    // Fetches goals associated with the authenticated user and sends them as a JSON response.
    const goals = await Goal.find({ user: req.user.id })

    res.status(200).json(goals)
})

// CREATE
// @desc    Set goal
// @route   POST /api/goals
// @access  Private
const setGoal = asyncHandler(async (req, res) => {      // using express async handler
    // Error handling 
    if (!req.body.text) {
        res.status(400)
        throw new Error('Please add a text field')
    }

    // Create a new goal with the creator's nickname
    const goal = await Goal.create({
        text: req.body.text,
        user: req.user.id,
    });

    res.status(200).json(goal);
})

// UPDATE
// @desc    Update goal
// @route   PUT /api/goals/:id
// @access  Private
const updateGoal = asyncHandler(async (req, res) => {       // using express async handler
    const goal = await Goal.findById(req.params.id)

    // Check for the existence of the goal
    if (!goal) {
        res.status(400)
        throw new Error('Goal not found')
    }

    // Check for user
    if (!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    // Make sure the logged in user matches the goal user
    if (goal.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    // Updates an existing goal based on the ID specified in the request parameters
    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })

    res.status(200).json(updatedGoal)
})

// DELETE
// @desc    Delete goal
// @route   DELETE /api/goals/:id
// @access  Private
const deleteGoal = asyncHandler(async (req, res) => {       // using express async handler
    const goal = await Goal.findById(req.params.id)

    if (!goal) {
        res.status(400)
        throw new Error('Goal not found')
    }

    // Check for user
    if (!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    // Make sure the logged in user matches the goal user
    if (goal.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    // Deletes an existing goal based on the ID specified in the request parameters
    await Goal.deleteOne({ _id: req.params.id })

    res.status(200).json({ id: req.params.id })
})

// Exporting router handlers as an object
module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal,
    getPublicGoals
}