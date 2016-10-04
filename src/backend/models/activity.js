var mongoose = require('mongoose');

var activitySchema = new mongoose.Schema({
    id: { type:Number },
    library_id: { type:Number },
    book_id: { type:Number },
    starting_date: { type:String, trim:true },
    ending_date: { type:String, trim:true },
});

// the 1st arg is the singular name of the collection the model is for.
// So the model 'Activity' is for 'activities' collection in the database.
module.exports = mongoose.model('Activity', activitySchema);
