// import packages
import Joi from 'joi'

// import helpers
import getValidationErrors from '../helpers/validate.js'

class IndexValidation {
    async sampleValidation(req, res, next) {
        const schema = Joi.object({
            name: Joi.string().required().messages({
                'any.required': 'name is required',
                'string.empty': 'name should not be empty',
                'string.base': 'name must be string',
            }),
            age: Joi.number().required().options({ convert: false }).messages({
                'any.required': 'age is required',
                'number.base': 'age should be number value',
            }),
        })
        await getValidationErrors(schema, 'body', req, res, next)
    }
}

export default new IndexValidation()
