const express = require('express');
const app = express();
const port = 3000;

const path = require('path');
const basePath = path.join(__dirname, 'templates');

app.use(
    express.urlencoded({
        extended: true,
    }),
);

app.use(express.json());

//Middlewares
// const checkAuth = (req, res, next) => {
//     req.authStatus = true;

//     if(req.authStatus) {
//         console.log('Está logado, pode continuar');
//         next();
//     }

//     if(!req.authStatus) {
//         console.log('Não está logado, faça login para continuar');
//         next();
//     }
// }

// app.use(checkAuth);

//post
app.get('/users/add', (req, res) => {
    res.sendFile(`${basePath}/userform.html`);
})

app.post('/users/save', (req, res) => {
    //ler o body
    const { name, age } = req.body
    
    res.sendFile(`${basePath}/userform.html`)
});



app.get('/', (req, res) => {
    res.sendFile(`${basePath}/index.html`);
});

//params
app.get('/users/:id', (req, res) => {
    const id = req.params.id;
    
    //leitura da tabela users, resgatar um usário no banco;

    res.send(`<h1>Carregando o usuário de id ${id} </h1>`);
});


//404 page
app.use((req, res, next) => {
    res.status(404).sendFile(`${basePath}/404.html`)
})


app.listen(port, () => {
    console.log('Servidor iniciado na porta 3000');
})
