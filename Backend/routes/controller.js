var express = require('express');
var router = express.Router();

/* Create the Database Connection */
var pg = require('pg');

var conString = "postgres://bbxgyxcu:o6sN_sfzjG5uNdqtK3yxaucHX3SDXpFa@heffalump.db.elephantsql.com/bbxgyxcu" //Can be found in the Details page
var client = new pg.Client(conString);

/* TestConnection Table */
router.get('/TestConnection', function(req, res, next) {
  client.connect((err) => {
    if(err) {
      return console.error("[Connection Error]: " + err);
    };

    client.query(`SELECT * FROM TestConnection`, (err, result) => {
      if(err) {
        return console.error("[Query Error]: ", err)
      }

      const data = result.rows;
      res.send(data);
      client.end();
    });
  })
});

module.exports = router;
