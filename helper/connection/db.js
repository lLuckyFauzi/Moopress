const { MongoClient } = require("mongodb");

let dbConnection;
const uri = `mongodb+srv://Lynne:lucky123@cluster0.tltsg18.mongodb.net/enovels?retryWrites=true&w=majority`;

module.exports = {
  connectToDb: (cb) => {
    MongoClient.connect(uri)
      .then((client) => {
        dbConnection = client.db();
        return cb();
      })
      .catch((err) => {
        console.log(err);
        return cb(err);
      });
  },
  getDb: () => dbConnection,
};
