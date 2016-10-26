var express = require('express');

//var sql = require('mssql');

var bookRouter = express.Router();

var router = function (nav) {
    var bookService = require('../services/goodreadsService')();
    var bookController = require('../controllers/bookController')(bookService, nav);
    bookRouter.use(bookController.middleware);
    bookRouter.route('/').get(bookController.getIndex);

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
        .get(bookController.getById);

    return bookRouter;
};

module.exports = router;
