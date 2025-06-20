import { body } from 'express-validator';

export class CategoryValidators {
  static create() {
    return [
      body('name')
        .notEmpty().withMessage('Category name is required')
        .isString().withMessage('Category name must be a string')
    ];
  }

  static delete() {
    return [];
  }
}