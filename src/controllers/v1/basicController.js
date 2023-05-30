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
            if (getUserData) {
                res.status(400).json({ message: 'Email already exists' })
            } else {
                await sampleUser.create(data)
                res.status(400).json({ message: 'User added successfully' })
            }
        } catch (error) {
            console.log('Error catched in addUser', error)
            res.status(500).json({ message: messages.catchError })
        }
    }
}

export default new BasicController()
