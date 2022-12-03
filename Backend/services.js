const crypto = require('crypto');
const RestaurantTablesCollection = require('./schemas/restaurantTablesSchema');
const python = require('python-bridge')();
const moment = require('moment');

const tablesSeed = async () => {
	const tablesExist = (await RestaurantTablesCollection.count()) != 0;
	if (!tablesExist) {
		let index = 0;
		[2, 2, 2, 2, 4, 4, 4, 6, 6, 8].forEach(async (size) => {
			index++;
			const document = {
				size: size,
				number: index,
				occupiedTimings: []
			}

			const newTable = new RestaurantTablesCollection(document);
			await newTable.save();
		})
	}
}

const datesOverlap = (desiredDate, occupiedDate) => {
	desiredDate = moment(desiredDate, "YYYY-MM-DD");
	occupiedDate = moment(occupiedDate, "YYYY-MM-DD");
	return occupiedDate.isSame(desiredDate);
}

const timingsOverlap = (
	desiredStartTime,
	desiredEndTime,
	desiredDate,
	occupiedDate,
	occupiedStartTime,
	occupiedEndTime) => {
	
	if (!datesOverlap(desiredDate, occupiedDate)) {
		return false;
	}
	desiredStartTime = moment(desiredStartTime, "HH:mm");
	desiredEndTime = moment(desiredEndTime, "HH:mm");

	occupiedStartTime = moment(occupiedStartTime, "HH:mm");
	occupiedEndTime = moment(occupiedEndTime, "HH:mm");
	
	if (desiredStartTime.isSame(occupiedStartTime) || desiredStartTime.isSame(occupiedEndTime)) {
		return true;
	}

	if (desiredStartTime.isBefore(occupiedStartTime) && (desiredEndTime.isBefore(occupiedStartTime))) {
		return false;
	}

	if (desiredStartTime.isAfter(occupiedEndTime) && (desiredEndTime.isAfter(occupiedEndTime))) {
		return false;
	}

	return true;
}

const isTableAvailable = (table, desiredStartTime, desiredEndTime, desiredDate) =>
{
	const notOccupied = Object.keys(table.occupiedTimings).length === 0;

	if (notOccupied) {
		return true;
	}

	let available = true;
	for (const key in table.occupiedTimings) {
		const timing = table.occupiedTimings[key];
		const occupiedDate = timing.date;
		const occupiedStartTime = timing.startTime;
		const occupiedEndTime = timing.endTime;

		const isOverlapping = timingsOverlap(
			desiredStartTime,
			desiredEndTime,
			desiredDate,
			occupiedDate,
			occupiedStartTime,
			occupiedEndTime
		);

		available = isOverlapping ? false : available;
	}

	return available;
}

const getAvailableTables = async (startTime, endTime, date) => {
	return RestaurantTablesCollection.find().then((tables) => {
		const availableTables = []

		tables.forEach((table) => {
			if (isTableAvailable(table, startTime, endTime, date)) {
				availableTables.push(table)
			}
		})

		return availableTables;
	});
}

const findTablesWithSizes = (tables, sizes)  => {
	const output = []
	for (let index = 0; index < sizes.length; index++) {
		currentSize = sizes[index];

		for (let index2 = 0; index2 < tables.length; index2++) {
			currentTable = tables[index2]

			if (currentTable.size == currentSize) {
				output.push(currentTable);
				tables.splice(index2, 1);
				break;
			}
		}
	}

	return output;
}

const multipleTablesMatch = (availableTables, guestCount) => {
	guestCount = guestCount % 2 == 0 ? guestCount : guestCount + 1;  // adjust guest count if odd

	for (let index = 0; index < availableTables.length; index++) {
		let currentTable = availableTables[index];
		
		if (currentTable.size % guestCount == 0) {
			return [currentTable];
		}
	}

	const tablesSizes = availableTables.map((table) => table.size)
	python.ex`
	import itertools

	def getTableCombinations(tableSizes, guestCount):
		return [seq for i in range(len(tableSizes), 0, -1)
				for seq in itertools.combinations(tableSizes, i)
				if sum(seq) == guestCount]
	`;
	return python`getTableCombinations(${tablesSizes}, ${guestCount})`.then(x => {
		const sizesCombo = Object.values(x)[0];
		if (!sizesCombo) {
			return [];
		}
		return findTablesWithSizes(availableTables, sizesCombo);
	});
}

const singleTableMatch = (availableTables, guestCount) => {
	guestCount = guestCount % 2 == 0 ? guestCount : guestCount + 1;
	return availableTables.find((table) => table.size == guestCount);
}

const services = {
    generateToken: () => crypto.randomBytes(32).toString('hex'),
    singleTableMatch: singleTableMatch,
    multipleTablesMatch: multipleTablesMatch,
    findTablesWithSizes: findTablesWithSizes,
    getAvailableTables: getAvailableTables,
    isTableAvailable: isTableAvailable,
    timingsOverlap: timingsOverlap,
    datesOverlap: datesOverlap,
    tablesSeed: tablesSeed
};

module.exports = services;