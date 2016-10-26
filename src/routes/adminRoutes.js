var express = require('express');

var adminRouter = express.Router();

var mongodb = require('mongodb').MongoClient;

var router = function(nav) {
    var books = [{
        title: 'War and Peace',
        genre: 'Historical Fiction',
        author: 'Lev NokiLayevich Tolstoy',
        bookId: 656,
        read: false
    }, {
        title: 'Les misérables',
        genre: 'Historical',
        author: 'Victor Hugo',
        read: true
    }];
    adminRouter.route('/addBooks')
        .get(function(req, res) {
            var url = 'mongodb://localhost:27017/NodeJsWebApp';
            mongodb.connect(url, function(err, db) {
                var collection = db.collection('books');
                collection.insertMany(books, function(err, results) {
                    res.send(results);
                    db.close();
                });
            });
            //res.send('inserting books');
        });
    return adminRouter;
};

module.exports = router;
