// packages
import bcrypt from 'bcrypt'

// helpers
import globalData from '../helpers/globals.js'

import sql from 'mssql'

const sqlConfig = {
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    database: process.env.SQL_DB,
    server: 'localhost',
    type: 'mssql',
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000,
    },
    options: {
        trustServerCertificate: true,
    },
}
class CommonService {
    async encrypt(data) {
        try {
            const encData = await bcrypt.hash(data, Number(globalData.salt))
            console.log('encData', encData)
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

    async executeStoredProcedure() {
        try {
            await sql.connect(sqlConfig)
            const request = new sql.Request()

            // Execute the stored procedure
            await request.input('Uname', sql.VarChar(50), 'raj').input('Age', sql.VarChar(50), '12w').input('first_name', sql.VarChar(50), 'Chan').input('last_name', sql.VarChar(50), 'Krrish').input('email', sql.VarChar(150), '12w').input('password', sql.VarChar(70), '12w').input('user_role', sql.Int, '1').input('active_status', sql.Int, '1').input('delete_status', sql.Int, '0').execute('executeStoredProcedure')
        } catch (err) {
            console.error(err)
        } finally {
            // Close the connection pool
            sql.close()
        }
    }
}

export default new CommonService()
