function getMatrix(user, year, month, day) {
	let dailySchedule = user.events.daily.daily;
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
