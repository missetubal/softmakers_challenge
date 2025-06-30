import { Router } from 'express';
import { register, login, listAll } from '../controllers';

const authRoutes = Router();

authRoutes.post('/register', register);
authRoutes.post('/login', login);
authRoutes.get('/list', listAll);

export default authRoutes;
