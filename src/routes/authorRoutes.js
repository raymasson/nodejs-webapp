var express = require('express');

var authorRouter = express.Router();

authorRouter.route('/').get(function(req, res) {
    res.send('Hello Authors');
});

authorRouter.route('/single').get(function(req, res) {
    res.send('Hello single Author');
});

module.exports = authorRouter;
