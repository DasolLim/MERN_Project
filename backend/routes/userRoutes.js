const express = require('express')
const router = express.Router()
const {
    registerUser,
    loginUser,
    getMe,
    // grantAdminPrivilege,
    // deactivateUser,
    // restoreActivation,
} = require('../controllers/userController')

const { protect } = require('../middleware/authMiddleware')

router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe);
// router.post('/:userId/grant-admin', protect, grantAdminPrivilege);
// router.post('/:userId/deactivate', protect, deactivateUser); // Add this line
// router.post('/:userId/restore-activation', protect, restoreActivation); // Add this line

module.exports = router