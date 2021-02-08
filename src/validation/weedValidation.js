import Joi from "joi";

const validation = weed => {
  const schema = Joi.object({
    name: Joi.string().empty().required()
      .messages({
        "any.required": "Sorry, Weed name is required.",
        "string.empty": "Weed name cannot be an empty field.",
      }),
    imageUrl: Joi.string().empty()
      .messages({
        "string.base": "Please provide a valid link",
        "string.empty": "Sorry, image Picture cannot be an empty field"
      }),
    pricePerQty: Joi.number().integer().required().empty()
      .messages({
        "any.required": "A price number is required.",
        "number.empty": "Integer field cannot be an empty field.",
        "number.base": "Please provide a valid number."

      }),
  }).messages({
    "object.unknown": "You have used an invalid key."
  }).options({ abortEarly: false });
  return schema.validate(weed);
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
