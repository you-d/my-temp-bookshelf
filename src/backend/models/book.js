var mongoose = require('mongoose');

var bookSchema = new mongoose.Schema({
    id: { type:Number },
    title: { type:String, trim:true },
    author: { type:String, trim:true },
    isbn: { type:String, trim:true },
});

// the 1st arg is the singular name of the collection the model is for.
// So the model 'Book' is for 'books' collection in the database.
module.exports = mongoose.model('Book', bookSchema);
