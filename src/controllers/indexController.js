// helpers
import messages from '../helpers/messages.js'

// model
import sampleUser from '../models/sampleuser.js'
class IndexController {
    async addUser(req, res) {
        try {
            const data = req.body
            data.email = data.email.toLowerCase()
            const getUserData = await sampleUser.findOne({ where: { email: data.email } })
            if (getUserData) {
                res.status(400).json({ message: 'success' })
            } else {
                res.status(400).json({ message: 'success' })
            }
        } catch (error) {
            console.log('Error catched in addUser', error)
            res.status(500).json({ message: messages.catchError })
        }
    }

    async login(req, res) {
        try {
            // let data = req.body;
            res.status(200).json({ message: 'Login success' })
        } catch (error) {
            console.log('Error catched in login', error)
        }
    }
}

export default new IndexController()
