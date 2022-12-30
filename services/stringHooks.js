export const capitalize = str => {
	if (str) {
		let words = str.split(' ');
		return words
			.map(word => {
				let arr = word.toLowerCase().split('');
				arr.splice(0, 1, arr[0].toUpperCase());
				return arr.join('');
			})
			.join(' ');
	}
};
