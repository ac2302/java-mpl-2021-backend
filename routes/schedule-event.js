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

router.post("/", authOnlyMiddleware, async (req, res) => {
	const { name, start, end, description, reminder, year, month, day } =
		req.body;

	if (!name || !start || !end || !year || !month || !day)
		return res.json({ err: "missing required fields" });

	// getting day
	const days = req.auth.user.events.days.filter(
		(d) => d.year === year && d.month === month && d.day === day
	);

	if (days.length === 0) {
		// add new day
		req.auth.user.events.days.push({
			year,
			month,
			day,
			events: [
				{
					name,
					start,
					end,
					description,
					reminder,
				},
			],
		});
	} else {
		// add event to day
		req.auth.user.events.days = req.auth.user.events.days.map((d) => {
			if (d.year === year && d.month === month && d.day === day) {
				d.events.push({ name, start, end, description, reminder });
			}
			return d;
		});
	}

	await req.auth.user.save();

	res.json({ name, start, end, description, reminder, year, month, day });
});


const getMatrix = require('../utils/scheduler').getMatrix

router.post("/debug", authOnlyMiddleware, async (req, res) => {
	const { year, month, day } =
		req.body;

	if (!year || !month || !day)
		return res.json({ err: "missing required fields" });

    res.json({'matrix': getMatrix(req.auth.user, year, month, day)});
	
});

module.exports = router;
