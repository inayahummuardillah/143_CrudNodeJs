const express = require('express');
const todoRoutes = require('./routes/tododb.js');
require('dotenv').config();
const port = process.env.PORT;
const app = express();

const expressLayout = require('express-ejs-layouts')

const db =  require('./database/db')

app.use(expressLayout);

app.use(express.json());

app.use('/todos', todoRoutes);
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));

// Konfigurasi express-session
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // Set ke true jika menggunakan HTTPS
}));


app.use('/', authRoutes);

app.get('/', (req, res) => {
    res.render('index', {
        layout: 'layouts/main-layout'
    });
});

app.get('/contact',(req, res) => {
    res.render('contact',{
        layout: 'layouts/main-layout'
    });
});

app.get('/todo-view', (req, res) => {
    db.query('SELECT * FROM todos', (err, todos) => {
        if (err) return res.status(500).send('Internal Server Error');
        res.render('todo', {
            layout: 'layouts/main-layout',
            todos: todos
        });
    });
});


app.get('/', (req, res) => {
    res.render('index');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

app.use((req, res) => {
    res.status(404).send('404 - Page Not Found');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});