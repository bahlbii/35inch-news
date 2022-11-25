var pg = require('pg');
const dotenv = require("dotenv").config();

var conString = process.env.PGURL //Can be found in the Details page
var client = new pg.Client(conString);

client.connect(function (err) {
  if (err) {
    return console.error('could not connect to postgres', err);
  }
  //client.end();
});

module.exports = {
  query: (text, params) => client.query(text, params),
}