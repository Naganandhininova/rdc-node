import 'dotenv/config'

const dbdetails = {
    development: {
        username: process.env.SQL_USER,
        password: process.env.SQL_PASSWORD,
        database: process.env.SQL_DB,
        host: process.env.SQL_HOST,
        dialect: 'mssql',
        port: process.env.SQL_PORT,
    },
}

export default dbdetails