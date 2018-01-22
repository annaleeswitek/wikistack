var express = require('express'); 
var app = express(); 
var morgan = require('morgan'); 
var bodyparser = require('body-parser'); 
var nunjucks = require('nunjucks'); 
var env = nunjucks.configure('views', {noCache: true});
var routes = require('./routes'); 
var models = require('./models');


//logging middlewear
app.use(morgan('dev')); 

//body parsing middlewear
app.use(bodyparser.urlencoded( {extended:true})); // HTML form submits
app.use(bodyparser.json()); 


// have res.render work with html files
app.set('view engine', 'html');

// when res.render works with html files, have it use nunjucks to do so
app.engine('html', nunjucks.render);

app.use('/', routes); 

//static middewear
app.use(express.static(__dirname + "/public")); 

models.db.sync({force: true})

.then(function () {
    // make sure to replace the name below with your express app
    app.listen(3000, function () {
        console.log('Server is listening on port 3000!');
    });
})
.catch(console.error);

