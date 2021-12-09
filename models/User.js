const mongoose = require("mongoose");

const timeSchema = new mongoose.Schema({
	hours: { type: Number },
	minutes: { type: Number },
});

const eventSchema = new mongoose.Schema({
	name: { type: String },
	start: { type: timeSchema },
	end: { type: timeSchema },
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
			weekly: {
				monday: {
					type: [eventSchema],
					default: [],
				},
				tuesday: {
					type: [eventSchema],
					default: [],
				},
				wednesday: {
					type: [eventSchema],
					default: [],
				},
				thursday: {
					type: [eventSchema],
					default: [],
				},
				friday: {
					type: [eventSchema],
					default: [],
				},
				saturday: {
					type: [eventSchema],
					default: [],
				},
				sunday: {
					type: [eventSchema],
					default: [],
				},
			},
			days: {
				type: [daySchema],
				default: [],
			},
		},
	})
);
