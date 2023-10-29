const { MongoClient } = require("mongodb");

let _db;

module.exports.connect = async function () {
  const url = process.env.MONGO_URL;
  const dbname = "ecommerce";

  try {
    const client = await MongoClient.connect(url);
    _db = client.db(dbname);
    console.log("Connected to MongoDB!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
};

module.exports.get = function () {
  if (!_db) {
    throw new Error("Database not connected!");
  }
  return _db;
};
