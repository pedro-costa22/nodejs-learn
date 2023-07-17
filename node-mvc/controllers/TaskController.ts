import Task from "../models/Task";
import { Response, Request } from "express";

class TaskController {

    static createTask(req: Request, res: Response) {
        res.render('tasks/create');
    }

    static showTasks(req: Request, res: Response) {
        res.render('tasks/all');
    }
}

export default TaskController;