var mongoose = require('mongoose');

var librarySchema = new mongoose.Schema({
    id: { type:Number },
    name: { type:String, trim:true },
    address: { type:String, trim:true },
});

// the 1st arg is the singular name of the collection the model is for.
// So the model 'Library' is for 'libraries' collection in the database.
module.exports = mongoose.model('Library', librarySchema);
