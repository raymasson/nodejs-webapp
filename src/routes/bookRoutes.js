var express = require('express');

var sql = require('mssql');

var bookRouter = express.Router();

var router = function(nav) {
    var books = [{
        title: 'War and Peace',
        genre: 'Historical Fiction',
        author: 'Lev NokiLayevich Tolstoy',
        read: false
    }, {
        title: 'Les misérables',
        genre: 'Historical',
        author: 'Victor Hugo',
        read: true
    }];

    bookRouter.route('/').get(function(req, res) {
        //res.send('Hello Books');
        var request = new sql.Request();
        request.query('select * from Book', function(err, recordset) {
            console.log(recordset);
        });

        res.render('books', {
            title: 'Books',
            nav: nav,
            books: books
        });
    });

    bookRouter.route('/:id').get(function(req, res) {
        //res.send('Hello single Book');
        var id = req.params.id;

        res.render('book', {
            title: 'Book',
            nav: nav,
            book: books[id]
        });
    });

    return bookRouter;
};

module.exports = router;
