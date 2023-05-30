// packages
import express from 'express'

// validation
import BasicValidation from '../../validations/v1/basicValidation.js'

// helpers
import RedisDb from '../../helpers/redisDb.js'
import messages from '../../helpers/messages.js'

// controllers
import BasicController from '../../controllers/v1/basicController.js'
const router = express.Router()

// sample route
router.get('/', async (req, res) => {
    res.status(200).json({ message: 'success' })
})

// validation sample
router.post('/addUser', BasicValidation.addUser, BasicController.addUser)

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

export default router
