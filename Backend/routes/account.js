const router = require('express').Router();
const AccountsCollection = require('../schemas/accountSchema');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const services = require('../services')

const saltRounds = 10;
let loginTokens = {};

router.post("/login", async (req, res) => {

	const user = await AccountsCollection.findOne({ username: req.body.username });

	if (user == null) {
		return res.json({ isSuccessful: false, message: "The username or password is incorrect." });
	}

	if (await bcrypt.compare(req.body.password, user.password)) {
		const token = services.generateToken();
		loginTokens = { ...loginTokens, [token]: { "username": user.username, "userId": user.userId } };

		return res.json({ isSuccessful: true, message: "Success", userId: `${user.userId}`, loginToken: token});
	} else {
		return res.json({ isSuccessful: false, message: "The username or password is incorrect." });
	}
});

// verify login token
router.get("/login/verify", async (req, res) => {
	const loginToken = req.query.token;

	if (Object.keys(loginTokens).includes(loginToken)) {
		return res.json({isLoggedIn: true});
	}

	return res.json({isLoggedIn: false});
});

router.post("/logout", async (req, res) => {
	const loginToken = req.body.loginToken;

	if (Object.keys(loginTokens).includes(loginToken)) {
		delete loginTokens[loginToken];
	}
	
	return res.sendStatus(200);
});

router.post('/register', async (req, res) => {
	let { username, password, userId } = req.body;
	const body = req.body;

	if (username == '' || password == '') {
		console.error("Server Error: username or password cannot not be empty")
		return res.json({ isSuccessful: false, message: "Username or Password cannot not be empty." });
	}

	if (username.includes(" ") || password.includes(" ")) {
		console.error("Server Error: username or password cannot contain whitespace")
		return res.json({ isSuccessful: false, message: "Username or Password cannot contain whitespace." });
	}

	const usernameAlreadyExists = await AccountsCollection.findOne({ username: username });
	if (usernameAlreadyExists) {
		return res.json({ isSuccessful: false, message: "Username already exists." })
	}

	const newUserIdRequired = await AccountsCollection.findOne({ userId: userId });

	bcrypt.hash(password, saltRounds, async (err, hashedPassword) => {
		body.userId = newUserIdRequired != null ? services.generateToken() : userId;
		body.password = hashedPassword;
		const newUser = new AccountsCollection(body);
		newUser.save().then((result) => {
			// send new user id
			if (newUserIdRequired) {
				return res.json({
					isSuccessful: true,
					message: "UserId already exists",
					userIdExists: true,
					newUserId: userId
				});
			}

			return res.json({ isSuccessful: true, message: "Success." })
		});
	});

});

// generate user id
router.get('/userid', async (req, res) => {
	return res.json({userId: services.generateToken()});
});

module.exports = router;