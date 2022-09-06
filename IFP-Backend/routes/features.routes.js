import jwt from '../middleware/auth';
import { Router } from "express";
const featuresRouter = Router();
const featuresController = require('../controllers/features.controller.js');

// Retrieve All data
featuresRouter.get('/list', jwt, featuresController.findAll);

// Retrieve data with pagination
featuresRouter.get('/', jwt, featuresController.findPagination);

// Find one by ID
featuresRouter.get('/:id', jwt, featuresController.findOne);

// Create
featuresRouter.post('/', jwt, featuresController.create);

// Update
featuresRouter.put('/:id', jwt, featuresController.update);

// Delete
featuresRouter.delete('/:id', jwt, featuresController.delete);



export default featuresRouter;
