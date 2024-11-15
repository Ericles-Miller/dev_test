import { Router } from 'express';
import { UserController } from '../Controllers/UserController';
import { PostController } from '../Controllers/PostController';

export const router = Router();

const userController = new UserController();
const postController = new PostController();

router.post('/users', userController.handle);
router.post('/posts', postController.handle);