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
router.get('/ResturantTable/:tableId/:numberOfGuests/:date', async (req, res) => {
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
        avaliableTables.push(table);
      }
    }

    const numberOfGuests = parseInt(req.params.numberOfGuests);
    
    // Find tables with the exact number
    const singleTablesExact = FindSingleExactTables(tables, numberOfGuests);
    if(singleTablesExact.length) {
      res.send(singleTablesExact);
      return;
    }

    // Find table combination with the exact number
    const combinationTablesExact = FindCombinationTablesExact(tables, numberOfGuests);
    if(combinationTablesExact.length) {
      res.send(combinationTablesExact);
      return;
    }

    // Find table combination with atleast exact number
    const combinationTablesAtleast = FindCombinationTablesAtleast(tables, numberOfGuests);
    if(combinationTablesAtleast.length) {
      res.send(combinationTablesAtleast);
      return;
    }

    // No table exists for this date
    res.send([]);
})

/* Reservation Table */

/* TestConnection Table */
router.get('/TestConnection', async (req, res) => {
  const result = await db.query(`SELECT * FROM TestConnection`);
  res.send(result);
});

module.exports = router;

const FindSingleExactTables = (tables, numberOfGuests) => {
  const filterTables = [];
  for(const table of tables) {
      if(table.chairs === numberOfGuests) {
        filterTables.push(table.id);
      }
  }

  return filterTables;
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