const express = require('express')
const router = express.Router()
const {
    registerUser,
    loginUser,
    getMe,
    grantAdminPrivilege,
} = require('../controllers/userController')

const { protect } = require('../middleware/authMiddleware')

router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/me', protect, getMe)

// testing: /api/users/:id/grant-admin (grant admin privilege to other users)
router.put('/:id/grant-admin', protect, grantAdminPrivilege);
// testing /api/users/:id/update-deactivation (admin can mark any user account as "deactivated")
router.put('/:id/update-deactivation', protect, updateDeactivationStatus);

module.exports = router