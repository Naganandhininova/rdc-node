// packages
import jwt from 'jsonwebtoken'

// helpers
import globalData from '../helpers/globals.js'

class AuthService {
    async generatePayload(data) {
        const token = jwt.sign(data, globalData.jwtSecret)
        console.log('token', token)
        return token
    }
}

export default new AuthService()
