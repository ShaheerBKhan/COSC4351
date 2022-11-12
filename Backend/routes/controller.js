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
router.get('/ResturantTable/:numberOfGuests/:date', async (req, res) => {
    const tables = await db.query(`SELECT * FROM ResturantTable`);
    
    const avaliableTables = [];
    for(const table of tables) {
      const count = await db.query(
        `SELECT Count(Id) FROM reservation 
        WHERE resturanttableid = '${table.id}' AND date = '${req.params.date}'`
      );
      
      const reservationExists = parseInt(count[0].count);
      if(!reservationExists) {
        avaliableTables.push(table);
      }
    }

    const numberOfGuests = parseInt(req.params.numberOfGuests);
    
    const selectedTableSet = [];
    // Find tables with the exact number
    const singleTablesExact = FindSingleExactTables(avaliableTables, numberOfGuests);
    if(singleTablesExact.length) {
      selectedTableSet = singleTablesExact;
    } else {
      // Find table combination with the exact number
      const combinationTablesExact = FindCombinationTablesExact(avaliableTables, numberOfGuests);
      if(combinationTablesExact.length) {
        selectedTableSet = combinationTablesExact;
      } else {
        // Find table combination with atleast exact number
        const combinationTablesAtleast = FindCombinationTablesAtleast(avaliableTables, numberOfGuests);
        if(combinationTablesAtleast.length) {
          selectedTableSet = combinationTablesAtleast;
        }
      }
    }

    res.send(selectedTableSet);
})

/* High-Traffic Days */
router.get('/IsHighTrafficDate/:date', async (req, res) => {
  const highTrafficDate = await db.query(`
    SELECT COUNT(Id) FROM HighTrafficDate WHERE date = '${req.params.date}'
  `);

  const isHighTrafficDate = parseInt(highTrafficDate[0].count);
  res.send(Boolean(isHighTrafficDate))
})

/* Reservation Table */
router.post('/Reservation', async (req, res) => {
  const {
    customerId,
    resturantTableId,
    name, 
    phone, 
    email, 
    date, 
    numberOfGuests
  } = req.body;

  await db.query(`
    INSERT INTO Reservation(CustomerId, ResturantTableId, Name, Phone, Email, Date, NumberOfGuests)
    VALUES(
      ${customerId},
      ${resturantTableId},
      ${name},
      ${phone},
      ${email},
      ${date},
      ${numberOfGuests}
    );
  `);
});

/* TestConnection Table */
router.get('/TestConnection', async (req, res) => {
  const result = await db.query(`SELECT * FROM TestConnection`);
  res.send(result);
});

module.exports = router;

const FindSingleExactTables = (tables, numberOfGuests) => {
  const solutions = [];
  for(const table of tables) {
      if(table.chairs === numberOfGuests) {
        solutions.push(table);
        break;
      }
  }

  return solutions;
}

const FindCombinationTablesExact = (tables, numberOfGuests) => {
  const solutions = [];
  
  const FindAllCombinations = (tableSubset, tableIndex, guests) => {
    if(guests === numberOfGuests) {
      solutions.push(tableSubset);
      return;
    }

    for(let i=tableIndex; i<tables.length; i++) {
      FindAllCombinations([...tableSubset, tables[tableIndex]], i + 1, guests + tables[i].chairs);
      FindAllCombinations([...tableSubset], i + 1, guests);
    }
  }

  FindAllCombinations([], 0, 0)
  if(!solutions.length) {
    return [];
  }
  return solutions.reduce((prev, next) => prev.length > next.length ? next : prev);
}

const FindCombinationTablesAtleast = (tables, numberOfGuests) => {
  const solutions = [];

  const FindAllCombinations = (tableSubset, tableIndex, guests) => {
    if(guests > numberOfGuests) {
      solutions.push(tableSubset);
      return;
    }

    for(let i=tableIndex; i<tables.length; i++) {
      FindAllCombinations([...tableSubset, tables[tableIndex]], i + 1, guests + tables[i].chairs);
      FindAllCombinations([...tableSubset], i + 1, guests);
    }
  }
  FindAllCombinations([], 0, 0);
  if(!solutions.length) {
    return [];
  }
  return solutions.reduce((prev, next) => prev.length > next.length ? next : prev);
}