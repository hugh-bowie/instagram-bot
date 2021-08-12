function r(min, max) {
	return ~~(Math.random() * (max - min + 1) + min);
}

module.exports = r;
// Function that creates random time delays
