// helpers
import messages from '../../helpers/messages.js'

// model
import sampleUser from '../../models/sampleuser.js'

// services
import AuthService from '../../services/authService.js'
import CommonService from '../../services/commonService.js'
class BasicController {
    async addUser(req, res) {
        try {
            const data = req.body
            data.email = data.email.toLowerCase()
            const getUserData = await sampleUser.findOne({ where: { email: data.email } })
            if (!getUserData) {
                const result = await CommonService.encrypt(data.password)
                data.password = result
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
                const passResult = await CommonService.comparePassword(data.password, getUserData.password)
                if (passResult) {
                    const token = await AuthService.generatePayload({ id: getUserData.id, role: getUserData.user_role })
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

    async getUserList(req, res) {
        try {
            const getData = await sampleUser.findAll({})
            console.log('getData', getData)
            if (getData && getData.length > 0) {
                res.status(200).json({ status: true, message: messages.dataFetch, data: getData })
            } else {
                res.status(200).json({ status: true, message: messages.dataFetch, data: [] })
            }
        } catch (error) {
            console.log(`Error catched in getUserList -> ${error}`)
            res.status(500).json({ status: false, message: messages.catchError })
        }
    }
}

export default new BasicController()
