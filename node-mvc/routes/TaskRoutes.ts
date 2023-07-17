
import TaskController from '../controllers/TaskController';
import { Router } from "express";

const router = Router();

router.get('/add', TaskController.createTask);
router.get('/', TaskController.showTasks);

export default router;



