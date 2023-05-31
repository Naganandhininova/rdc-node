// helpers
import messages from '../../helpers/messages.js'

// model
import sampleUser from '../../models/sampleuser.js'

// services
import AuthService from '../../services/authService.js'
class BasicController {
    async addUser(req, res) {
        try {
            const data = req.body
            data.email = data.email.toLowerCase()
            const getUserData = await sampleUser.findOne({ where: { email: data.email } })
            if (!getUserData) {
                await sampleUser.create(data)
                res.status(201).json({ status: true, message: messages.addUser })
            } else {
                res.status(400).json({ status: false, message: messages.emailExist })
            }
        } catch (error) {
            console.log(`Error catched in addUser -> ${error}`)
            res.status(500).json({ status: false, message: messages.catchError })
        }
    }

    async login(req, res) {
        try {
            const data = req.body
            data.email = data.email.toLowerCase()
            const getUserData = await sampleUser.findOne({ where: { email: data.email } })
            if (getUserData) {
                if (getUserData.password === data.password) {
                    const token = await AuthService.generatePayload({ id: getUserData.id })
                    res.status(200).json({ status: true, message: messages.loggedIn, data: token })
                } else {
                    res.status(400).json({ status: false, message: messages.invalidPassword })
                }
            } else {
                res.status(400).json({ status: false, message: messages.invalidEmail })
            }
        } catch (error) {
            console.log(`Error catched in login -> ${error}`)
            res.status(500).json({ status: false, message: messages.catchError })
        }
    }
}

export default new BasicController()
