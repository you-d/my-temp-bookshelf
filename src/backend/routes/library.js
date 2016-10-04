var express = require('express');
var router = express.Router();

var path = require('path');

var libraryModel = require( path.join(__dirname, '../models/library') );

/* GET => /library */
// find all documents
router.get('/', function(req, res, next) {
    libraryModel.find(function(err, libraries) {
        if(err) return next(err);

        res.json(libraries);
    });
});

/* GET => /library/:id */
// find a document by id
router.get('/:id', function(req, res, next) {
    // Notice that req.params matches the placeholder name we set while
    // defining the route.
    libraryModel.findById(req.params.id, function(err, library) {
        if(err) return next(err);

        res.json(library);
    });
});

/* POST => /library */
// create a document
router.post('/', function(req, res, next) {
    libraryModel.create(req.body, function(err, post) {
        if(err) return next(err);

        res.json(post);
    });
});

/* PUT => /library/:id */
// update a document
router.put('/:id', function(req, res, next) {
    libraryModel.findByIdAndUpdate(req.params.id, req.body, function(err, post) {
        if (err) return next(err);

        res.json(post);
    });
});

/* DELETE => /library/:id */
router.delete('/:id', function(req, res, next) {
    libraryModel.findByIdAndRemove(req.params.id, req.body, function(err, post) {
        if (err) return next(err);

        res.json(post);
    });
});

module.exports = router;
