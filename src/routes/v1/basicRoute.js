// packages
import express from 'express'

// validation
import BasicValidation from '../../validations/v1/basicValidation.js'

// controllers
import BasicController from '../../controllers/v1/basicController.js'

// services
import AuthService from '../../services/authService.js'

const router = express.Router()

// add user
router.post('/addUser', BasicValidation.addUser, BasicController.addUser)
// login user
router.post('/login', BasicValidation.login, BasicController.login)
// get list
router.get('/getUserList', AuthService.adminAccess, BasicController.getUserList)

export default router
