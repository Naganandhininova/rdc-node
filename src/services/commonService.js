// packages
import bcrypt from 'bcrypt'

// helpers
import globalData from '../helpers/globals.js'

class CommonService {
    async encrypt(data) {
        try {
            const encData = await bcrypt.hash(data, Number(globalData.salt))
            return encData
        } catch (error) {
            console.log(`Error catched in encrypt -> ${error}`)
            return ''
        }
    }

    async comparePassword(data, hash) {
        try {
            const result = await bcrypt.compare(data, hash)
            return result
        } catch (error) {
            console.log(`Error catched in comparePassword -> ${error}`)
            return false
        }
    }
}

export default new CommonService()
