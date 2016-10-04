var express = require('express');
var router = express.Router();

var path = require('path');

var activityModel = require( path.join(__dirname, '../models/activity') );

/* GET => /activity */
// find all documents
router.get('/', function(req, res, next) {
    activityModel.find(function(err, activities) {
        if(err) return next(err);

        res.json(activities);
    });
});

/* GET => /activity/:id */
// find a document by id
router.get('/:id', function(req, res, next) {
    // Notice that req.params matches the placeholder name we set while
    // defining the route.
    activityModel.findById(req.params.id, function(err, activity) {
        if(err) return next(err);

        res.json(activity);
    });
});

/* POST => /activity */
// create a document
router.post('/', function(req, res, next) {
    activityModel.create(req.body, function(err, post) {
        if(err) return next(err);

        res.json(post);
    });
});

/* PUT => /activity/:id */
// update a document
router.put('/:id', function(req, res, next) {
    activityModel.findByIdAndUpdate(req.params.id, req.body, function(err, post) {
        if (err) return next(err);

        res.json(post);
    });
});

/* DELETE => /activity/:id */
router.delete('/:id', function(req, res, next) {
    activityModel.findByIdAndRemove(req.params.id, req.body, function(err, post) {
        if (err) return next(err);

        res.json(post);
    });
});

module.exports = router;
