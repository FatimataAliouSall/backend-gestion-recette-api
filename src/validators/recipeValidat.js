import { check, param, validationResult } from 'express-validator';
import { StatusCodes } from 'http-status-codes';
import Recipe from '../models/RecipeModel.js';

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(StatusCodes.UNPROCESSABLE_ENTITY)
      .json({ errors: errors.array() });
  }
  next();
};

const addRequestValidator = [
  check('title')
    .not()
    .isEmpty()
    .withMessage('Le titre de la recette doit être unique.')
    .bail()
    .isLength({ min: 5, max: 100 })
    .withMessage(
      'Le titre doit comporter au moins 5 ou au plus 100 caractères.'
    )
    .bail()
    .custom(async (value) => {
      const existingRecipe = await Recipe.checkRecipe(value);
      if (existingRecipe) {
        throw new Error('Cette recette existe déjà.');
      }
      return true;
    }),
  check('type')
    .optional()
    .not()
    .isEmpty()
    .withMessage(
      'Le type de recette est obligatoire. Il doit être : entrée, plat, dessert.'
    ),
  check('ingredient')
    .optional()
    .not()
    .isEmpty()
    .isLength({ min: 10, max: 500 })
    .withMessage(
      'Les ingrédients doivent comporter au moins 10 ou au plus 500 caractères.'
    ),
  handleValidationErrors,
];

const deleteRequestValidator = [
  param('id')
    .not()
    .isEmpty()
    .withMessage('LID est obligatoire.')
    .bail()
    .custom(async (value) => {
      const recipe = await Recipe.getById(value);
      if (!recipe) {
        throw new Error('Cette recette nexiste pas.');
      }
      return true;
    }),
  handleValidationErrors,
];

const updateRequestValidator = [
  param('id')
    .not()
    .isEmpty()
    .withMessage('LID de la recette est requis.')
    .bail()
    .custom(async (value) => {
      const recipe = await Recipe.getById(value);
      if (!recipe) {
        throw new Error('Cette recette nexiste pas.');
      }
      return true;
    }),
  check('title')
    .optional()
    .isLength({ min: 5, max: 100 })
    .withMessage(
      'Le titre doit comporter au moins 5 ou au plus 100 caractères.'
    ),
  check('type')
    .optional()
    .not()
    .isEmpty()
    .withMessage('Le type de recette est obligatoire.'),
  check('ingredient')
    .optional()
    .not()
    .isEmpty()
    .isLength({ min: 10, max: 500 })
    .withMessage(
      'Les ingrédients doivent comporter au moins 10 ou au plus 500 caractères.'
    ),
  handleValidationErrors,
];

const getByIdRequestValidator = [
  param('id')
    .not()
    .isEmpty()
    .withMessage('LID de la recette est requis.')
    .bail()
    .custom(async (value) => {
      const recipe = await Recipe.getById(value);
      if (!recipe) {
        throw new Error('Cette recette nexiste pas.');
      }
      return true;
    }),
  handleValidationErrors,
];

export {
  addRequestValidator,
  deleteRequestValidator,
  updateRequestValidator,
  getByIdRequestValidator,
};
