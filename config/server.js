/* importar o modulo do framework express */
var express = require('express');
var consign = require('consign');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');

/* Init Express server */
var app = express();

/* Setup Express variables 'view engine' and 'views' */
app.set('view engine', 'ejs');
app.set('views', './app/views');

/* Setup middlewares and assets */
app.use(express.static('./app/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressValidator());

/* setup consign autoload */
consign()
    .include('app/routes')
    .then('app/models')
    .then('app/controllers')
    .into(app);

/* exportar o objeto app */
module.exports = app;