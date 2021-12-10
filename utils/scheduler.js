function getMatrix(user, year, month, day) {
	console.log({ user });

	let dailySchedule = user.events.daily;
	let events = dailySchedule;

	const days = user.events.days.filter(
		(d) => d.year === year && d.month === month && d.day === day
	);

	if (days.length === 1) {
		events = dailySchedule.concat(days[0].events);
	}

	// and operations
	let matrix = Array(60 * 24).fill(true);

	events.forEach((e) => {
		for (let i = e.start; i <= e.end; i++) {
			matrix[i] = false;
		}
	});

	return matrix;
}

function getCommonMatrix(users, year, month, day) {
	const matrices = users.map((user) => getMatrix(user, year, month, day));
	let commonMatrix = Array(60 * 24).fill(true);

	for (let i = 0; i < 60 * 24; i++) {
		matrices.forEach((matrix) => {
			commonMatrix[i] = commonMatrix[i] && matrix[i];
		});
	}

	return commonMatrix;
}

module.exports = {
	getMatrix,
	getCommonMatrix,
};
