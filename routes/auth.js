const jwt = require("jsonwebtoken");
const router = require("express").Router();
const User = require("../models/User");
const config = require("../config");

router.get("/self", require("../middlewares/authonly"), (req, res) => {
	res.json(req.auth);
});

router.post("/register", async (req, res) => {
	const { username, password, email } = req.body;

	if (!username || !password || !email)
		return res.status(400).send("missing username, password or email");

	// checking if username exists
	const users = await User.find({ username: username });
	if (users.length > 0) return res.send("username is taken");

	// add user
	const newUser = new User({ username, password, email });
	return res.json(await newUser.save());
});

router.post("/login", async (req, res) => {
	const { username, password } = req.body;

	if (!username || !password)
		return res.status(400).send("missing username or password");

	// checking if username exists
	const users = await User.find({ username: username });
	if (users.length === 0) return res.status(400).send("username is incorrect");

	const user = users[0];

	if (user.password !== password) return res.status(400).send("incorrect password");

	// sending token
	const token = await jwt.sign(
		{
			id: user._id,
			iat: Math.floor(Date.now() / 1000) + config.tokenLife,
		},
		config.jwtSecret
	);
	res.setHeader("token", token);
	res.json({ token });
});

module.exports = router;
