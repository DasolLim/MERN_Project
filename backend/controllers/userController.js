const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    // Check if user exists
    const userExists = await User.findOne({ email })

    if (userExists) {
        res.status(400)
        throw new Error('User already exists')
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    })

    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
        // Set req.user here
        req.user = {
            _id: user.id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        };

        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        });
    } else {
        res.status(400).json({ error: 'Invalid credentials' });
    }
});

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
    res.status(200).json(req.user)
})

// @desc    Grant admin privilege to user
// @route   POST /api/users/grant-admin/:id
// @access  Private (only accessible by admin)
// granting admin privilege to a user:
// const grantAdminPrivilege = asyncHandler(async (req, res) => {
//     // Ensure that the logged-in user is an admin
//     if (!req.user || !req.user.isAdmin) {
//         res.status(403);
//         throw new Error('Not authorized to grant admin privilege');
//     }

//     // Get user ID from request parameters
//     const userId = req.params.id;

//     // Find the user by ID
//     const user = await User.findById(userId);

//     if (!user) {
//         res.status(404);
//         throw new Error('User not found');
//     }

//     // Update the user's isAdmin field to true
//     user.isAdmin = true;
//     await user.save();

//     res.status(200).json({ success: true, message: 'Admin privilege granted' });
// });

// @desc    Update user deactivation status
// @route   PUT /api/users/:id/deactivate
// @access  Private (only accessible by admin)
// const updateDeactivationStatus = asyncHandler(async (req, res) => {

//     // Ensure that the logged-in user is an admin
//     if (!req.user || !req.user.isAdmin) {
//         res.status(403);
//         throw new Error('Not authorized to update deactivation status');
//     }

//     // Get user ID from request parameters
//     const userId = req.params.id;

//     // Find the user by ID
//     const user = await User.findById(userId);

//     if (!user) {
//         res.status(404).json({ error: 'User not found' });
//         return;
//     }

//     user.isDeactivated = !user.isDeactivated;
//     await user.save();

//     res.status(200).json({
//         message: user.isDeactivated
//             ? 'User marked as deactivated'
//             : 'User marked as activated',
//     });
// });

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}

module.exports = {
    registerUser,
    loginUser,
    getMe,
    // grantAdminPrivilege,
    // updateDeactivationStatus,
}