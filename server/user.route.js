import express from 'express';

import { createUser, loginUser, getAllUsers } from './user.controller.js';
import authenticate from './authMiddleware.js';

const router = express.Router();

router.post('/register', createUser);
router.post('/login', loginUser);
router.get('/users', authenticate, getAllUsers);

export default router;