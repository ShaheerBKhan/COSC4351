const router = require('express').Router();
const RestaurantTablesCollection = require('../schemas/restaurantTablesSchema');
const ReservationCollection = require('../schemas/reservationSchema');
const services = require('../services')

router.get('/tables', async (req, res) => {
	const guestCount = parseInt(req.query.guestCount);
	const date = req.query.date;
	const [startTime, endTime] = req.query.timings.split('-');
	const availableTables = await services.getAvailableTables(startTime, endTime, date);
	const occupy = {
		startTime: startTime,
		endTime: endTime,
		date: date
	}

	if (!availableTables) {
		return res.json([]);
	}
	const singleTable = services.singleTableMatch(availableTables, guestCount);
	if (singleTable) {
		
		singleTable.occupiedTimings.push(occupy);
		return res.json([singleTable]);
	}

	const multipleTables = await services.multipleTablesMatch(availableTables, guestCount);
	if (multipleTables) {
		multipleTables.forEach((table) => {
			table.occupiedTimings.push(occupy);
		})
		return res.json(multipleTables);
	}
});

router.get('/', async (req, res) => {
	const userId = req.query.userId;
	const reservations = await ReservationCollection.find({ userId: userId }).clone();
	res.json(reservations);
});

router.post('/', async (req, res) => {
	const reservation = {
		userId: req.body.userId,
		fullName: req.body.fullName,
		phone: req.body.phone,
		email: req.body.email,
		tableNumber: req.body.tableNumber,
		tableSize: req.body.tableSize,
		date: req.body.date,
		time: req.body.time,
		combineNeeded: req.body.combineNeeded,
		guestCount: req.body.guestCount,
		cardName: req.body.cardName,
		cardNumber: req.body.cardNumber,
		cardExp: req.body.cardExp,
		cardCvc: req.body.cardCvc
	}
	
	req.body.tables.forEach(async (table) => {
		await RestaurantTablesCollection.updateOne({ number: table.number }, table);
	})

	const reservationMessage = new ReservationCollection(reservation);
	reservationMessage.save().then(() => {
		return res.json({ isSuccessful: true, message: "Success." })
	});
});

module.exports = router;
