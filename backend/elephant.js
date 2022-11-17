var pg = require('pg');

var conString = "postgres://jgngrfvp:OUugszsFKsJne021gvn8aXGMRKQdWgeX@surus.db.elephantsql.com/jgngrfvp" //Can be found in the Details page
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