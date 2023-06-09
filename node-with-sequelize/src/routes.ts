import { Router } from "express";
import { Request, Response } from "express";
import User from "./app/models/User";

const router = Router();

//Insert data
router.post('/users/create', async (req: Request, res: Response) => {
    const { name, occupation,  } = req.body;
    let { newsletter } = req.body;

    if(newsletter === 'on') {
        newsletter = true;
    }

    console.log(req.body);

    await User.create({
        name,
        occupation,
        newsletter
    }).then(() => {
        res.status(200)
        res.send('Usuario cadastrado com sucesso');
    });
});


export default router;