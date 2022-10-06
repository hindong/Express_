"use Strict";


const express = require('express');
const {engine} = require('express-handlebars');
const fortune = require('./lib/fortune');

const app = express();
const PORT = process.env.PORT || 5000;

app.engine('handlebars', engine({
    extname: ".handlebars",
    defaultLayout: 'main',
}));

app.set('view engine', 'handlebars');
app.set("views", "./views");

app.use(express.static(__dirname + '/public'));


app.get('/', (req, res) => res.render('home'));

app.get('/about', (req,res) => {
    res.render('about', {fortune: fortune.getFortune()});
}) 



app.use((req, res) => {
    res.status(404).render('404');
});

app.use((err, req, res, next) => {
    console.error(err.message);
    res.status(500).render('500');
});

app.listen(PORT, () => console.log
        (`Express started on http://localhost;${PORT};` + 
          `press Ctrl-C tp terminate.`));


