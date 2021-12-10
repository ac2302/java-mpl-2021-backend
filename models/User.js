const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
	name: { type: String },
	start: { type: Number },
	end: { type: Number },
	description: { type: String },
	reminder: { type: Date },
});

const daySchema = new mongoose.Schema({
	month: { type: Number },
	day: { type: Number },
	events: {
		type: [eventSchema],
		default: [],
	},
});

module.exports = mongoose.model(
	"User",
	new mongoose.Schema({
		username: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		created: {
			type: Date,
			default: Date.now,
		},
		events: {
			daily: {
				type: [eventSchema],
				default: [],
			},
			days: {
				type: [daySchema],
				default: [],
			},
		},
	})
);
