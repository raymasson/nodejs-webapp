var express = require('express');

//var sql = require('mssql');

var mongodb = require('mongodb').MongoClient;

var bookRouter = express.Router();

var ObjectId = require('mongodb').ObjectID;

var router = function(nav) {
    bookRouter.use(function(req, res, next) {
        if (!req.user) {
            res.redirect('/');
        } else {
            next();
        }
    });
    bookRouter.route('/').get(function(req, res) {
        //res.send('Hello Books');
        //var request = new sql.Request();
        //request.query('select * from Book', function(err, recordset) {
        //console.log(recordset);
        //});
        var url = 'mongodb://localhost:27017/NodeJsWebApp';
        mongodb.connect(url, function(err, db) {
            var collection = db.collection('books');
            collection.find({}).toArray(function(err, results) {
                res.render('books', {
                    title: 'Books',
                    nav: nav,
                    books: results
                });
            });
        });
    });

    bookRouter.route('/:id')
        /*.all(function(req, res, next) {
            var id = req.params.id;
            var ps = new sql.PreparedStatement();
            ps.input('BookId', sql.Int);
            ps.prepare('select * from Book where BookId = @BookId', function(err) {
                ps.execute({
                    BookId: id
                }, function(err, recordset) {
                    if (recordset.length === 0) {
                        res.status(404).send('Not Found');
                    } else {
                        req.book = recordset[0];
                        next();
                    }

                    //console.log(recordset);
                });
            });
        })*/
        .get(function(req, res) {
            //res.send('Hello single Book');
            /*res.render('book', {
                title: 'Book',
                nav: nav,
                book: req.book
            });*/
            var id = new ObjectId(req.params.id);
            var url = 'mongodb://localhost:27017/NodeJsWebApp';
            mongodb.connect(url, function(err, db) {
                var collection = db.collection('books');
                collection.findOne({
                    _id: id
                }, function(err, results) {
                    res.render('book', {
                        title: 'Book',
                        nav: nav,
                        book: results
                    });
                });
            });
        });

    return bookRouter;
};

module.exports = router;
