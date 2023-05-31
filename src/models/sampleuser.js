// packages
import { DataTypes } from 'sequelize'
// db
import sequelize from './db.js'

const sampleUser = sequelize.define(
    'sampleuser',
    {
        first_name: {
            type: DataTypes.STRING(50),
        },
        last_name: {
            type: DataTypes.STRING(50),
        },
        email: {
            type: DataTypes.STRING(70),
        },
        password: {
            type: DataTypes.STRING(150),
        },
        user_role: {
            type: DataTypes.INTEGER,
        },
        active_status: {
            type: DataTypes.INTEGER,
        },
        delete_status: {
            type: DataTypes.INTEGER,
        },
    },
    {
        freezeTableName: true,
    }
)

sampleUser.sync()

export default sampleUser
