const { MongoClient } = require('mongodb');
const DATABASE_URI="mongodb+srv://rayhan:rayhan@cluster0.7wax6.mongodb.net/?retryWrites=true&w=majority";
const connectionString = DATABASE_URI;
const client = new MongoClient(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let dbConnection;

module.exports = {
  connectToServer: function (callback) {
    client.connect(function (err, db) {
      if (err || !db) {
        return callback(err);
      }

      dbConnection = db.db('homeservice');
      console.log('Successfully connected to MongoDB.');

      return callback();
    });
  },

  getDb: function () {
    return dbConnection;
  },
};
