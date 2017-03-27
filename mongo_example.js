"use strict";

const MongoClient = require("mongodb").MongoClient;



module.exports = function connectToDB(url, callback) {

  MongoClient.connect(url, callback)
};