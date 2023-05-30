// import packages
import express from 'express'

// import validation
import IndexValidation from '../validations/indexValidation.js'

// import helpers
import RedisDb from '../helpers/redisDb.js'
import messages from '../helpers/messages.js'

// import controllers
import IndexController from '../controllers/indexController.js'
const router = express.Router()

// sample route
router.get('/', async (req, res) => {
    console.log('Basic route')
    res.status(200).json({ message: 'success' })
})

// validation sample
router.post('/getData', IndexValidation.sampleValidation, (req, res) => {
    res.status(200).json({ message: 'Validation successful' })
})

// redis sample
router.get('/productList', async (req, res) => {
    try {
        console.log('req.body', req.body.email, req.body.password)
        let getData = await RedisDb.getData('product')
        getData = JSON.parse(getData)
        res.send(getData)
    } catch (error) {
        console.log('Error catched in productList -> ', error)
        res.status(500).json({ message: messages.catchError })
    }
})

router.post('/login', IndexController.login)

export default router
