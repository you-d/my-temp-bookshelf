var express = require('express');
var router = express.Router();

var path = require('path');

var bookModel = require( path.join(__dirname, '../models/book') );

/* GET => /book */
// find all documents
router.get('/', function(req, res, next) {
    bookModel.find(function(err, books) {
        if(err) return next(err);
      
        res.json(books);
    });
});

/* GET => /book/:id */
// find a document by id
router.get('/:id', function(req, res, next) {
    // Notice that req.params matches the placeholder name we set while
    // defining the route.
    bookModel.findById(req.params.id, function(err, book) {
        if(err) return next(err);

        res.json(book);
    });
});

/* POST => /book */
// create a document
router.post('/', function(req, res, next) {
    bookModel.create(req.body, function(err, post) {
        if(err) return next(err);

        res.json(post);
    });
});

/* PUT => /book/:id */
// update a document
router.put('/:id', function(req, res, next) {
    bookModel.findByIdAndUpdate(req.params.id, req.body, function(err, post) {
        if (err) return next(err);

        res.json(post);
    });
});

/* DELETE => /book/:id */
router.delete('/:id', function(req, res, next) {
    bookModel.findByIdAndRemove(req.params.id, req.body, function(err, post) {
        if (err) return next(err);

        res.json(post);
    });
});

module.exports = router;
