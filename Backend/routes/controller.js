const router = require('express').Router();

/* Create the Database Connection */
var pg = require('pg');
var conString = "postgres://bbxgyxcu:o6sN_sfzjG5uNdqtK3yxaucHX3SDXpFa@heffalump.db.elephantsql.com/bbxgyxcu" //Can be found in the Details page
var client = new pg.Client(conString);

const bcrypt = require('bcrypt');
const saltRounds = 10;

/* User Table */
router.post('/User', (req, res) => {
  const requestBody = req.body;
  client.connect((err) => {
    if(err) {
      return console.error("[Connection Error]: " + err);
    };

    bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
      client.query(
        `INSERT INTO customer(Username, Password, Name, MailingAddress, BillingAddress, EarnedPoints, PaymentMethod) 
        VALUES(
          '${requestBody.username}',
          '${hash}',
          '${requestBody.name}',
          '${requestBody.mailingAddress}',
          '${requestBody.billingAddress}',
          '${0}',
          '${requestBody.paymentMethod}'
        )`, 
      (err, result) => {
        if(err) {
          return console.error("[Query Error]: ", err)
        }
        client.end();
      });
    });
  })
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