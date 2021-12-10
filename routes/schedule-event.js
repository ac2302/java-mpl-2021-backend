const jwt = require("jsonwebtoken");
const router = require("express").Router();
const User = require("../models/User");
const config = require("../config");
const authOnlyMiddleware = require("../middlewares/authonly");

router.post("/daily", authOnlyMiddleware, async (req, res) => {
	const { name, start, end, description, reminder } = req.body;

	if (!name || !start || !end)
		return res.json({ err: "missing required fields" });

	req.auth.user.events.daily.push({
		name,
		start,
		end,
		description,
		reminder,
	});

	try {
		await req.auth.user.save();
	} catch (err) {
		return res.status(400).json({ err });
	}

	res.json({ name, start, end, description, reminder });
});

module.exports = router;
