import express from 'express';
import { fetch, create, update } from '../controllers/booksController.js';

const route = express.Router();

route.post("/create", create);
route.post("/list", fetch);
route.put("/update/:_id", update);

export default route;