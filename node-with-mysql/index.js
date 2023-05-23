const express = require('express');
const exphbs = require('express-handlebars');
const mysql = require('mysql');

const app = express();

//engine config
const hbs = exphbs.create({
    partialsDir: ["views/partials"],
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.static('public'));

//Middlewares
app.use(
    express.urlencoded({
        extended: true,
    }),
)

app.use(express.json());



//Initial route
app.get('/', (req, res) => {
    res.render('home');
});

app.post('/books/insertbook', (req, res) => {
    const { title, pageqty } = req.body;

    const sqlQuery = `
        INSERT INTO books (title, pageqty) 
        VALUES('${title}', '${pageqty}')
    `;

    conn.query(sqlQuery, (err) => {
        if(err) {
            return console.log(err);
        };

        res.redirect('/');
    });
});

app.get('/books', (req, res) => {
    const sqlQuery = "SELECT * FROM books";

    conn.query(sqlQuery, (err, data) => {
        if(err) {
            return console.log(err);
        };

        const books = data;
        res.render('books', {books});
    })

})

app.get('/books/:id', (req, res) => {
    const { id } = req.params;

    const sqlQuery = `SELECT * FROM books WHERE id = ${id}`

    conn.query(sqlQuery, (err, data) => {
        if(err) {
            return console.log(err);
        };

        const book = data[0];
        res.render('book', { book });
    });
})

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodemysql'
});

conn.connect((err) => {
    if(err) {
        console.log(err);
    };

    console.log('Conectou ao MySQL!');

    app.listen(3000);
})