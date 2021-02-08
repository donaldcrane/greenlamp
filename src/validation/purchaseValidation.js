import Joi from "joi";

const validation = Weed => {
  const schema = Joi.object({
    username: Joi.string().required()
      .messages({
        "any.required": "Sorry, Weed name is required.",
        "string.empty": "Weed name cannot be an empty field.",
        "string.base": "Weed name must contain only alphabetical characters."
      }),
    weedName: Joi.string().required()
      .messages({
        "any.required": "Sorry, Weed name is required.",
        "string.empty": "Weed name cannot be an empty field.",
        "string.base": "Weed name must contain only alphabetical characters."
      }),
    amountInNaira: Joi.integer().required()
      .empty()
      .messages({
        "any.required": "An Amount is required.",
        "integer.empty": "Amount cannot be an empty field.",
        "integer.base": "Please provide a valid amount."
      }),
    quantity: Joi.integer().required()
      .empty()
      .messages({
        "any.required": "A quantity is required.",
        "integer.empty": "Integer field cannot be an empty field.",
        "integer.base": "Please provide a valid number."
      }),
  }).messages({
    "object.unknown": "You have used an invalid key."
  }).options({ abortEarly: false });
  return schema.validate(Weed);
};
const validateId = ids => {
  const schema = Joi.object({
    id: Joi.string().required()
      .empty().guid({ version: "uuidv4" })
      .messages({
        "any.required": "ID not provided. Please provide an ID.",
        "string.empty": "ID cannot be an empty field.",
        "string.base": "ID must be a string.",
        "string.guid": "ID must be a UUID"
      }),
  }).messages({
    "object.unknown": "You have used an invalid key."
  }).options({ abortEarly: false });
  return schema.validate(ids);
};

export { validation, validateId };
