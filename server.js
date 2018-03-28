const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${ now }: ${ req.method} ${req.url}`;
    fs.appendFile('Server.log', log + '\n', (err) => {
        if (err) console.log(`Error occured while logging into file ${err}`);
    });
    next();
});

// app.use((req, res, next) =>{
//     res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (msg) => {
    return msg.toUpperCase();
});

app.get('/', (req, res) => {
    // res.send('<h1>Express says hello..</h1>');
    // res.send({Name: 'Saket',
    //         Likes: ['Biking', 'Playing Cricket']});
    res.render('home.hbs', {
        pageName: 'Home',
        welcomeMsg: 'You are at the home page of the site..'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageName: 'Help'
    });
});

app.listen(3000, () => {
    console.log('Server Started..');
});