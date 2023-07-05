import express from 'express';
import {signupUser,loginUser} from '../apifunction/Userapi.js';
import { uploadImage ,getImage} from '../apifunction/image-controller.js';
import { createPost,getAllPosts,getPost } from '../apifunction/post-controller.js';
import { authenticateToken } from '../apifunction/jwt-controller.js';
import upload from '../utils/upload.js';
const router = express.Router();
/**** This is for calling the api , but this file is specially for route****/
router.post('/signup',signupUser);
router.post('/login',loginUser);
router.post('/file/upload', upload.single('file'), uploadImage);
router.get('/file/:filename', getImage);
router.post('/create',authenticateToken,createPost);
router.get('/posts',authenticateToken,getAllPosts);
router.get('/post/:id', authenticateToken, getPost);
/**exported the router, need to import into index.js**/
export  default router;
