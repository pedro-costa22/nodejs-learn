const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const port = 3000;


//engine config
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

app.use(express.static('public'));

//Routes
app.get('/', (req, res) => {
    const products = [
        {
            id: 1,
            name: 'Caneta',
            color: 'Azul',
            price: '2.00'
        },
        {
            id: 2,
            name: 'Caneta',
            color: 'Vermelha',
            price: '2.00'
        },
        {
            id: 3,
            name: 'Caneta',
            color: 'Preta',
            price: '2.00'
        },
    ];


    res.render('home', {products});
});

app.listen(port, () => {
    console.log(`Servidor iniciado na porta 3000`);
});