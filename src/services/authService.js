// packages
import jwt from 'jsonwebtoken'

// helpers
import globalData from '../helpers/globals.js'
import messages from '../helpers/messages.js'
class AuthService {
    async generatePayload(data) {
        try {
            const token = jwt.sign(data, globalData.jwtSecret)
            return token
        } catch (error) {
            console.log(`Error catched in generatePayload -> ${error}`)
            return ''
        }
    }

    async adminAccess(req, res, next) {
        try {
            let token
            if (req.headers && req.headers.authorization) {
                const getToken = req.headers.authorization.split(' ')
                if (getToken.length === 2) {
                    const schema = getToken[0]
                    const credential = getToken[1]
                    if (/^Bearer$/i.test(schema)) {
                        token = credential
                    }
                    jwt.verify(token, globalData.jwtSecret, async (err, jwtResult) => {
                        if (!err) {
                            const userId = jwtResult.id
                            if (jwtResult.role === 0) {
                                req.userId = userId
                                next()
                            } else {
                                res.status(403).json({ status: false, message: messages.accessMessage })
                            }
                        } else {
                            res.status(401).json({ status: false, message: messages.unAuthorized })
                        }
                    })
                } else {
                    res.status(401).json({ status: false, message: messages.formatHeader })
                }
            } else {
                res.status(401).json({ status: false, message: messages.noHeader })
            }
        } catch (error) {
            console.log(`Error catched in userAccess -> ${error}`)
            res.status(500).json({ status: false, message: messages.catchError })
        }
    }
}

export default new AuthService()
