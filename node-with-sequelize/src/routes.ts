import { Router } from "express";
import { Request, Response } from "express";

//Models
import User from "./app/models/User";
import Address from "./app/models/Address";

const router = Router();

//Insert data
router.post('/users/create', async (req: Request, res: Response) => {
    const { name, occupation,  } = req.body;
    let { newsletter } = req.body;

    if(newsletter === 'on') {
        newsletter = true;
    }

    await User.create({
        name,
        occupation,
        newsletter
    }).then(() => {
        res.status(200)
        res.send('Usuario cadastrado com sucesso');
    });
});

//Select data
router.get('/users', async (req: Request, res: Response) => {
    const users = await User.findAll({raw: true}); //raw transforma o retorno em um array
    res.status(200);
    res.send(users);
});

//Select with Where
router.get('/users/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const user =  await User.findOne({
        raw: true, 
        where: 
        {id: id}
    });
    if(user) {
        res.status(200);
        res.send(user);
        return;
    }

    res.status(404);
    res.send('User not found');
});

//Delete
router.post('/users/detete/:id', async (req: Request, res: Response) => {
    const { id } = req.params;

    await User.destroy({where: {id: id}});
    res.status(200);
    res.send('Successfully deleted user');
});

//Edit
router.get('/users/edit/:id', async (req: Request, res: Response) => {
    const { id } = req.params;

    const user = await User.findOne({
        include: Address,
        where: 
        {id: id}
    });

    res.send({user: user?.get({plain: true})}); 
});

router.post('/users/update', async (req: Request, res: Response) => {
    const {id, name, occupation, newsletter} = req.body;

    const userData = {
        id, name, occupation, newsletter
    };

    await User.update(userData, {where: {id: id}});

    res.status(200);
    res.send('user updated successfully');
});

//Insert com relacionamento
router.post('/address/create', async (req: Request, res: Response) => {
    const { UserId, street, number, city } = req.body;

    const address = {
        UserId,
        street,
        number,
        city
    };

    await Address.create(address)
    .then(() => {
        res.status(200)
        res.send('Endereço cadastrado com sucesso!');
    });

});

//Delete addres
router.post('/address/delete', async (req: Request, res: Response) => {
    const { id } = req.body;
    
    await Address.destroy({
        where: { id: id }
    });

    res.status(200);
    res.send('Endereço excluido com sucesso!');
});



export default router;