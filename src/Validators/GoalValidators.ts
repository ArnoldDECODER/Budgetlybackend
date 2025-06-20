import { body } from 'express-validator';

export class GoalValidators {
  static create() {
    return [
      body('title')
        .notEmpty().withMessage('Goal title is required'),
      body('target_amount')
        .notEmpty().withMessage('Target amount is required')
        .isNumeric().withMessage('Target must be a number'),
      body('deadline')
        .optional()
        .isISO8601().withMessage('Deadline must be a valid date'),
    ];
  }

  static update() {
    return [
      body('title').optional().isString(),
      body('target_amount').optional().isNumeric(),
      body('current_amount').optional().isNumeric(),
      body('deadline').optional().isISO8601()
    ];
  }

  static delete() {
    return [];
  }
}