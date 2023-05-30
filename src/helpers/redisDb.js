import { createClient } from 'redis'
const client = createClient()
client.connect()

class RedisDb {
    async getData(tableName) {
        const getTableData = await client.get(tableName)
        if (!getTableData) {
            const tableValue = await this.setData(tableName)
            return tableValue
        } else {
            return getTableData
        }
    }

    async setData(tableName) {
        let value = [
            {
                product: 'DSA',
            },
            {
                product: 'Adbry',
            },
        ]
        value = JSON.stringify(value)
        await client.setEx(tableName, 120, value)
        return value
    }
}

export default new RedisDb()
