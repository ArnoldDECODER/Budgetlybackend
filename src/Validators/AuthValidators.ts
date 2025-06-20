import { body } from 'express-validator';

export class AuthValidators {
  static register() {
    return [
      body('name')
        .notEmpty().withMessage('Name is required'),
      body('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid email format'),
      body('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
      body('phone')
        .notEmpty().withMessage('Phone number is required'),
      body('type')
        .notEmpty().withMessage('User type is required'),
      body('status')
        .notEmpty().withMessage('User status is required')
    ];
  }

  static login() {
    return [
      body('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid email format'),
      body('password')
        .notEmpty().withMessage('Password is required')
    ];
  }
}