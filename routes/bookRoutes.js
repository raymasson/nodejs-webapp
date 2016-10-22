var express = require('express');

var bookRouter = express.Router();

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
    res.render('books', {
        title: 'Books',
        nav: [{
            Link: '/Books',
            Text: 'Books'
        }, {
            Link: '/Authors',
            Text: 'Authors'
        }],
        books: books
    });
});

bookRouter.route('/:id').get(function(req, res) {
    var id = req.params.id;
    res.render('book', {
        title: books[id].title,
        nav: [{
            Link: '/Books',
            Text: 'Books'
        }, {
            Link: '/Authors',
            Text: 'Authors'
        }],
        book: books[id]
    });
    //res.send('Hello single Book');
});

module.exports = bookRouter;
