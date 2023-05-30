// import packages
import Joi from 'joi'

// import helpers
import getValidationErrors from '../helpers/validate.js'

class IndexValidation {
    async addUser(req, res, next) {
        const schema = Joi.object({
            name: Joi.string().required().messages({
                'any.required': 'name is required',
                'string.empty': 'name should not be empty',
                'string.base': 'name must be string',
            }),
            email: Joi.string().email().required().messages({
                'any.required': 'email is required',
                'number.base': 'email must be string',
            }),
            password: Joi.string().required().messages({
                'any.required': 'password is required',
                'string.empty': 'password should not be empty',
            }),
            active_status: Joi.number().required().messages({
                'any.required': 'active_status is required',
            }),
            delete_status: Joi.number().required().messages({
                'any.required': 'delete_status is required',
            }),
        })
        await getValidationErrors(schema, 'body', req, res, next)
    }
}

export default new IndexValidation()
