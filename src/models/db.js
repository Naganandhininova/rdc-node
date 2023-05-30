// import packages
import Sequelize from 'sequelize'

// import helpers
import globalData from '../helpers/globals.js'

const sequelize = new Sequelize(globalData.sqlDb, globalData.sqlUser, globalData.sqlPassword, {
    host: globalData.sqlHost,
    port: globalData.sqlPort,
    dialect: 'mssql',
    dialectOptions: {
        options: {
            encrypt: true, // Enable encryption if required
            trustServerCertificate: true,
        },
    }
})

if (globalData.sqlPoolEnable === 'true') {
    sequelize.pool = {
        max: globalData.sqlPoolMax,
        min: globalData.sqlPoolMin,
    }
}

sequelize
    .authenticate()
    .then(() => {
        console.log('Database connection established successfully')
    })
    .catch((error) => {
        console.log(`Error in mssql database connection ${error}`)
    })

export default sequelize
