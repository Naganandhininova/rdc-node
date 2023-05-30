// packages
import { DataTypes } from 'sequelize'
// db
import sequelize from './db.js'

const sampleUser = sequelize.define(
    'sampleuser',
    {
        name: {
            type: DataTypes.STRING(100),
        },
        email: {
            type: DataTypes.STRING(70),
        },
        password: {
            type: DataTypes.STRING(30),
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

export default sampleUser
