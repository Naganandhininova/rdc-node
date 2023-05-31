// packages
import express from 'express'

// helpers
import RedisDb from '../../helpers/redisDb.js'
import messages from '../../helpers/messages.js'

const router = express.Router()

// sample route
router.get('/', async (req, res) => {
    res.status(200).json({ message: 'success' })
})

// redis sample
router.get('/productList', async (req, res) => {
    try {
        let getData = await RedisDb.getData('product')
        getData = JSON.parse(getData)
        res.send(getData)
    } catch (error) {
        console.log(`Error catched in productList -> ${error}`)
        res.status(500).json({ message: messages.catchError })
    }
})

export default router
