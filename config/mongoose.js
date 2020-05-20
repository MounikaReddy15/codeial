const mongoose = require('mongoose');

const env = require('./environment');
mongoose.connect(`mongodb://localhost/${env.db}`);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error in connecting to Mongodb'));

// when connection is open
db.once('open', function() {
    console.log('Connected to db :: mongodb');

});

module.exports = db;