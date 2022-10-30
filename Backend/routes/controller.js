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

//login route 
router.post("/Login", async (req, res) => {
  const {
    username,
    password
  } = req.body;

  let user = await db.query(`SELECT * FROM customer WHERE username = '${username}'`);

  if (user.length == 0) {
    return res.json({isSuccessful: false, message: "An account with this username was not found."});
  }
  
  if(await bcrypt.compare(password, user[0].password)){
    res.status(200).json({isSuccessful: true, message: "Success."});
      console.log("success");
  } else {
    return res.json({isSuccessful: false, message: "The username or password is incorrect."});
  }
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