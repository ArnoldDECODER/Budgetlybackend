import { body } from 'express-validator';

export class TransactionValidators {
  static create() {
    return [
      body('type')
        .notEmpty().withMessage('Transaction type is required')
        .isIn(['income', 'expense']).withMessage('Type must be income or expense'),
      body('amount')
        .notEmpty().withMessage('Amount is required')
        .isNumeric().withMessage('Amount must be a number'),
      body('date')
        .notEmpty().withMessage('Date is required')
        .isISO8601().withMessage('Date must be a valid ISO8601 string'),
      body('category_id')
        .notEmpty().withMessage('Category ID is required'),
    ];
  }

  static update() {
    return [
      body('type').optional().isIn(['income', 'expense']),
      body('amount').optional().isNumeric(),
      body('date').optional().isISO8601(),
      body('category_id').optional(),
      body('notes').optional().isString()
    ];
  }

  static delete() {
    return []; // handled via route param
  }
}