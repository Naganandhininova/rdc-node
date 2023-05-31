// import helpers
import messages from './messages.js'

const getValidationErrors = (schema, type, req, res, next) => {
    try {
        const dataType = type === 'body' ? req.body : req.params
        const validationResult = schema.validate(dataType)
        if (validationResult) {
            if (validationResult.error) {
                console.log('validationResult', validationResult.error)
                const errors = validationResult.error.details
                if (errors.length > 0) {
                    res.status(400).json({ status: false, message: errors[0].message })
                } else {
                    res.status(400).json({ status: false, message: messages.catchError })
                }
            } else {
                next()
            }
        } else {
            res.status(400).json({ status: false, message: messages.catchError })
        }
    } catch (error) {
        console.log(`Error catched in getValidationErrors -> ${error}`)
        res.status(500).json({ status: false, message: messages.catchError })
    }
}

export default getValidationErrors
