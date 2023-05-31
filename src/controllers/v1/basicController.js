// helpers
import messages from '../../helpers/messages.js'

// model
import sampleUser from '../../models/sampleuser.js'
class BasicController {
    async addUser(req, res) {
        try {
            const data = req.body
            data.email = data.email.toLowerCase()
            const getUserData = await sampleUser.findOne({ where: { email: data.email } })
            if (!getUserData) {
                await sampleUser.create(data)
                res.status(200).json({ status: true, message: messages.addUser })
            } else {
                res.status(400).json({ status: false, message: messages.emailExist })
            }
        } catch (error) {
            console.log('Error catched in addUser -> ', error)
            res.status(500).json({ status: false, message: messages.catchError })
        }
    }
}

export default new BasicController()
