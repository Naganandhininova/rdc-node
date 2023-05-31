// import packages
import Joi from 'joi'

// import helpers
import getValidationErrors from '../../helpers/validate.js'

class BasicValidation {
    async addUser(req, res, next) {
        const schema = Joi.object({
            first_name: Joi.string().required().messages({
                'any.required': 'first_name is required',
                'string.empty': 'first_name should not be empty',
                'string.base': 'first_name must be string',
            }),
            last_name: Joi.string().required().messages({
                'any.required': 'last_name is required',
                'string.empty': 'last_name should not be empty',
                'string.base': 'last_name must be string',
            }),
            email: Joi.string().email().required().messages({
                'any.required': 'email is required',
                'string.empty': 'email should not be empty',
                'string.email': 'email should be valid',
            }),
            password: Joi.string()
                .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
                .required()
                .messages({
                    'any.required': 'password is required',
                    'string.empty': 'password should not be empty',
                    'string.pattern.base': 'password must contain atleast one uppercase, one number and one special character.',
                }),
            user_role: Joi.number().options({ convert: false }).required().messages({
                'any.required': 'user_role is required',
                'number.base': 'user_role must be number',
            }),
            active_status: Joi.number().options({ convert: false }).required().messages({
                'any.required': 'active_status is required',
                'number.base': 'active_status must be number',
            }),
            delete_status: Joi.number().options({ convert: false }).required().messages({
                'any.required': 'delete_status is required',
                'number.base': 'delete_status must be number',
            }),
        })
        await getValidationErrors(schema, 'body', req, res, next)
    }
}

export default new BasicValidation()
