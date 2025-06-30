import { Router } from 'express';
import {
  createPost,
  deletePost,
  getAllPosts,
  getPostById,
  updatePost,
} from '../controllers';
import { authenticateToken } from '../middleware/auth-middleware';

const postRoutes = Router();

postRoutes.use(authenticateToken);

postRoutes.post('/', createPost);
postRoutes.get('/', getAllPosts);
postRoutes.get('/:id', getPostById);
postRoutes.put('/:id', updatePost);
postRoutes.delete('/:id', deletePost);

export default postRoutes;
