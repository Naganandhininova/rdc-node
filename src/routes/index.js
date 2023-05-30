// packages
import express from 'express'

// validation
import IndexValidation from '../validations/indexValidation.js'

// helpers
import RedisDb from '../helpers/redisDb.js'
import messages from '../helpers/messages.js'

// controllers
import IndexController from '../controllers/indexController.js'
const router = express.Router()

// sample route
router.get('/', async (req, res) => {
    res.status(200).json({ message: 'success' })
})

// validation sample
router.post('/addUser', IndexValidation.addUser, IndexController.addUser)

// redis sample
router.get('/productList', async (req, res) => {
    try {
        console.log('req  .body', req.body.email, req.body.password)
        let getData = await RedisDb.getData('product')
        getData = JSON.parse(getData)
        res.send(getData)
    } catch (error) {
        console.log('Error catched in productList -> ', error)
        res.status(500).json({ message: messages.catchError })
    }
})

// sample login
router.post('/login', IndexController.login)

export default router
