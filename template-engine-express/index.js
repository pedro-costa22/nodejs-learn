const express = require('express');
const exphbs = require('express-handlebars');
const app = express();

const hbs = exphbs.create({
    partialsDir: ["views/partials"],
})

//engine config
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.static('public'));

//Initial Route
app.get('/dashboard', (req, res) => {
    const items = ['Item a', 'Item b', 'Item C'];

    res.render('dashboard', {items});
});

app.get('/post', (req, res) => {
    const post = {
        title: 'Aprender NodeJS',
        category: 'JavaScript',
        body: 'Este artigo vai te ajudar aprender nodejs',
        comments: 4,
    };

    res.render('blogpost', {post});
});

app.get('/blog', (req, res) => {
    const posts = [
        {
            title: 'Aprender NodeJS',
            category: 'JavaScript',
            body: 'Este artigo vai te ajudar aprender nodejs',
            comments: 4,
        },
        {
            title: 'Aprender Python',
            category: 'Python',
            body: 'Este artigo vai te ajudar aprender Python',
            comments: 4,
        },
        {
            title: 'Aprender PHP',
            category: 'PHP',
            body: 'Este artigo vai te ajudar aprender php',
            comments: 4,
        },
    ];

    res.render('blog', {posts});
})

app.get('/', (req, res) => {
    const user = {
        name: 'Pedro',
        surname: 'Costa'
    };

    const auth = true;
    const approved = false;

    res.render('home', {user, auth, approved});
});

app.listen(3000, () => {
    console.log(`Servidor iniciado na porta 3000`);
})
