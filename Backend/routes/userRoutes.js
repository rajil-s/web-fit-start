const router = require('express').Router();
const userController = require('../controllers/userController.js');
const { authGuard } = require('../middleware/authGuard.js');

router.post('/register', userController.createUser);
router.post('/login', userController.loginUser);
router.get('/get_single_user/:id', authGuard, userController.getSingleUser);
router.put('/update_profile/:id', authGuard, userController.updateUser);
router.post('/forgot_password', userController.forgotPassword)
router.post('/verify_otp', userController.verifyOtpAndSetPassword)
router.get('/getMe',authGuard,userController.getMe)

router.post("/addPoints", authGuard, userController.addPoints);  // Correct route
router.get("/leaderboard", userController.getLeaderboard);        // Correct route

module.exports = router