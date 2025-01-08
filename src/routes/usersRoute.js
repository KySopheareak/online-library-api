import express from 'express';
import { fetch, create, update } from '../controllers/usersController.js';

const route = express.Router();

route.post("/create", create);
route.get("/list", fetch);
route.put("/update/:_id", update);

export default route;