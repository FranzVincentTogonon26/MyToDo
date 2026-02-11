import express from 'express';

import protectedRoutes from '../middleware/authentication.js'

const router = express.Router();

// Make sure All Routes are protected
router.use(protectedRoutes)

// router.get('/', );

export default router;