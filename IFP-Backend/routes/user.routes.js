import jwt from '../middleware/auth';
import { Router } from "express";
const userRouter = Router();
const userController = require('../controllers/user.controller.js');

// Retrieve All data
userRouter.get('/list', jwt, userController.findAll);

// Retrieve data with pagination
userRouter.get('/', jwt, userController.findPagination);

// Find one by ID
userRouter.get('/:id', jwt, userController.findOne);

// Create
userRouter.post('/', jwt, userController.create);

// Update
userRouter.put('/:id', jwt, userController.update);

// Delete
userRouter.delete('/:id', jwt, userController.delete);

//permissions

userRouter.put('/permissions/:id', jwt, userController.permissions);
userRouter.put('/module/:id', jwt, userController.module);
// userRouter.put('/view_permission/:id', jwt, userController.view_permission);
// userRouter.put('/update_permission/:id', jwt, userController.update_permission);
// userRouter.put('/delete_permission/:id', jwt, userController.delete_permission);

export default userRouter;
