const Joi = require('joi');

const profileSchema = Joi.object({
  fullName: Joi.string().min(2).required(),
  city: Joi.string().required(),
  religion: Joi.string().required(),
  status: Joi.string().valid('Married', 'Unmarried', 'Divorced').required(),
  email: Joi.string().email().allow(''),
  gender: Joi.string().valid('Male', 'Female', 'Other').required(),
  dateOfBirth: Joi.date().max('now').required(),
  preferredLanguage: Joi.string().required(),
  habits: Joi.array().items(Joi.string()),
  interests: Joi.array().items(Joi.string()),
  skills: Joi.array().items(Joi.string()),
});

const updateProfileSchema = Joi.object({
  fullName: Joi.string().min(2),
  city: Joi.string(),
  religion: Joi.string(),
  status: Joi.string().valid('Married', 'Unmarried', 'Divorced'),
  email: Joi.string().email().allow(''),
  gender: Joi.string().valid('Male', 'Female', 'Other'),
  dateOfBirth: Joi.date().max('now'),
  preferredLanguage: Joi.string(),
  habits: Joi.array().items(Joi.string()),
  interests: Joi.array().items(Joi.string()),
  skills: Joi.array().items(Joi.string()),
}).min(1); // at least one field

module.exports = { profileSchema, updateProfileSchema };