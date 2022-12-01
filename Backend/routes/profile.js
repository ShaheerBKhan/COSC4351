const router = require('express').Router();
const ProfilesCollection = require('../schemas/profileSchema');

router.post("/post", async (req, res) => {
	const filter = { userId: req.body.userId };
	const options = { upsert: true };
	ProfilesCollection.updateOne(filter, req.body, options).then((result) => {
		return res.json({isSuccessful: true});
	});
});

router.get("/get", async (req, res) => {
	ProfilesCollection.findOne({ userId: req.query.userId })
		.then((result) => {
			result == null
				? res.json({ isSuccessful: false, message: "Profile does not exist" })
				: res.json(result)
			}
		)
});

router.get("/get/status", async (req, res) => {
	const profileExists = await ProfilesCollection.findOne({ userId: req.query.userId }) != null
	return res.json({exists: profileExists});
});

module.exports = router;