const categories = [
	'None',
	'Hats',
	"Men's Clothing",
	"Women's Clothing",
	'Accessories',
	'Camping',
	'Hiking',
	'Gear',
];

const selectCategory = categories.map((el, i) => {
	return (
		<option key={i} value={el}>
			{el}
		</option>
	);
});

export default selectCategory;
