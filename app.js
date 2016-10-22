var express = require('express');

var app = express();

var sql = require('mssql');
var config = {
    user: 'login',
    password: 'password',
    server: 'localhost\\SQLEXPRESS',
    database: 'NodeJsWebApp',
    /*options: {
        encrypt: true
    }*/
};

sql.connect(config, function(err) {
    console.log(err);
});

var port = process.env.port || 5000;

var nav = [{
    Link: '/Books',
    Text: 'Book'
}, {
    Link: '/Authors',
    Text: 'Author'
}];

var bookRouter = require('./src/routes/bookRoutes')(nav);
var adminRouter = require('./src/routes/adminRoutes')(nav);
var authorRouter = require('./src/routes/authorRoutes');

app.use(express.static('public'));
//app.use(express.static('src/views'));
app.set('views', './src/views');
//app.set('view engine', 'jade');

//var handlebars = require('express-handlebars');
//app.engine('.hbs', handlebars({extname: '.hbs'}));
//app.set('view engine', '.hbs');

app.set('view engine', 'ejs');

app.use('/Books', bookRouter);
app.use('/Admin', adminRouter);
app.use('/Authors', authorRouter);

app.get('/', function(req, res) {
    //res.send('Hello World');
    //res.render('index', {list: ['a','b']});
    res.render('index', {
        title: 'Hello from render',
        nav: [{
            Link: '/Books',
            Text: 'Books'
        }, {
            Link: '/Authors',
            Text: 'Authors'
        }]
    });
});
/*app.get('/books', function(req, res) {
    res.send('Hello Books');
});*/
app.listen(port, function(err) {
    console.log('running server on port ' + port);
});
