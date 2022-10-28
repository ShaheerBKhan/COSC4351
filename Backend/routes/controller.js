const router = require('express').Router();

/* Create the Database Connection */
var pg = require('pg');
var conString = "postgres://bbxgyxcu:o6sN_sfzjG5uNdqtK3yxaucHX3SDXpFa@heffalump.db.elephantsql.com/bbxgyxcu" //Can be found in the Details page
var client = new pg.Client(conString);

/* User Table */
router.post('/User', (req, res) => {
  console.log("Req Params: ", req.params);
  console.log("Req Body: ", req.body);
})

/* Table Table */

/* Reservation Table */

/* TestConnection Table */
router.get('/TestConnection', (req, res) => {
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