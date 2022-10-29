const router = require('express').Router();

/* Create the Database Connection */
var conString = "postgres://bbxgyxcu:o6sN_sfzjG5uNdqtK3yxaucHX3SDXpFa@heffalump.db.elephantsql.com/bbxgyxcu" //Can be found in the Details page
const pgp = require("pg-promise")();
const db = pgp(conString);

const bcrypt = require('bcrypt');
const saltRounds = 10;

/* Customer Table */
router.post('/User', async (req, res) => {
  const requestBody = req.body;
  bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
    await db.query(
      `INSERT INTO customer(Username, Password, Name, MailingAddress, BillingAddress, EarnedPoints, PaymentMethod) 
      VALUES(
        '${requestBody.username}',
        '${hash}',
        '${requestBody.name}',
        '${requestBody.mailingAddress}',
        '${requestBody.billingAddress}',
        '${0}',
        '${requestBody.paymentMethod}'
      )`
    );
  });

  
})

/* ResturantTable Table */
router.get('/ResturantTable/:tableId/:date', async (req, res) => {
    req.params.date = "2022-10-29";
    const tables = await db.query(`SELECT * FROM ResturantTable`);
    
    const avaliableTables = [];
    for(const table of tables) {
      const count = await db.query(
        `SELECT Count(Id) FROM reservation 
        WHERE resturanttableid = '${table.id}' AND date = '${req.params.date}'`
      );
      
      const reservationExists = parseInt(count[0].count);
      if(!reservationExists) {
        avaliableTables.push(table.id);
      }
    }

    res.send(avaliableTables);
})

/* Reservation Table */

/* TestConnection Table */
router.get('/TestConnection', async (req, res) => {
  const result = await db.query(`SELECT * FROM TestConnection`);
  res.send(result);
});

module.exports = router;