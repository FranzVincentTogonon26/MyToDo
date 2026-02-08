import express from 'express';
import {body} from 'express-validator'

import { login, register } from '../controller/authController.js';

const router = express.Router();

// Validate middleware

const loginValidation = [
   body('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Please provide a valid Email'),
    body('password')
        .notEmpty()
        .withMessage('password is required')
];

const registerValidation = [
    body('username')
        .trim()
        .isLength({ min: 3 })
        .withMessage('Username must be at least 3 characters'),
    body('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Please provide a valid email'),
    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 character')
];

router.post('/login', loginValidation, login);
router.post('/register', registerValidation, register)

export default router;