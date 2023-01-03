import { useState, useEffect } from 'react';

const ItemAdd = () => {
	const [newItem, setNewItem] = useState({
		product: '',
		category: '',
		quantity: 0,
		price_each: '',
	});
	const categories = [
		'None',
		'Hats',
		"Men's Clothing",
		"Women's Clothing",
		'Accessories',
	];
	const selectCategory = categories.map((el, i) => {
		return (
			<option key={i} value={el}>
				{el}
			</option>
		);
	});
	function handleFormChange(event) {
		const { name, value, type, checked } = event.target;
		setNewItem(prevItem => ({
			...prevItem,
			[name]: type === 'checkbox' ? checked : value,
		}));
	}

	const handleSubmit = async event => {
		event.preventDefault();
		let { data: product, error } = handleCreate();
		if (error) {
			setError(error.message);
		} else {
			setInventory([...inventory, product]);
			setNewItem({
				product: '',
				category: '',
				quantity: 0,
				price_each: '',
			});
		}
	};

	return (
		<tr>
			<form className='flex gap-2 my-2' onSubmit={handleSubmit}>
				<label className='flex flex-col'>
					<span className='pl-1 opacity-60'>Product</span>
					<input
						className='rounded p-2 w-52'
						name='product'
						type='text'
						placeholder='Hat'
						value={newItem.product}
						onChange={handleFormChange}
						required
					/>
				</label>
				<label className='flex flex-col'>
					<span className='pl-1 opacity-60'>Category</span>
					<select
						className='rounded p-2'
						value={newItem.category}
						onChange={handleFormChange}
						name='category'
					>
						<option value=''>--Select a Category--</option>
						{selectCategory}
					</select>
				</label>
				<label className='flex flex-col'>
					<span className='pl-1 opacity-60'>Quantity</span>
					<input
						className='rounded p-2 w-28'
						name='quantity'
						type='number'
						placeholder='0'
						value={newItem.quantity}
						onChange={handleFormChange}
					/>
				</label>
				<label className='flex flex-col'>
					<span className='pl-1 opacity-60'>Price per item</span>
					<div className='flex items-center gap-0.5'>
						<input
							className='rounded p-2 w-28'
							name='price_each'
							type='text'
							placeholder='$0.00'
							value={`${newItem.price_each}`}
							onChange={handleFormChange}
						/>
					</div>
				</label>
				<button className='btn-black self-end ml-5'>Add</button>
			</form>
		</tr>
	);
};

export default ItemAdd;
