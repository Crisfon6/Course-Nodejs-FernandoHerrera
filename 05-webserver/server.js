const express = require('express');
const hbs = require('hbs');
const app = express();

require('./hbs/helpers'); //helpers 

//Middlewares
app.use(
    express.static(__dirname + '/public')
);


//Express HBS
hbs.registerPartials(__dirname + '/views/partials/');
app.set('view engine', 'hbs');



app.get('/', (req, res) => {
    res.render('home', {
        name: 'cristhian'
    });
});
app.get('/about', (req, res) => {
    res.render('about', {
        name: 'cristhian',
        year: new Date().getFullYear()
    });
});
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listen in port ${port}`);
})