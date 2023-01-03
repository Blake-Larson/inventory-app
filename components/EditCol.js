import { useEffect, useRef, useState } from 'react';
import { checkIcon } from '../assets/icons/check-icon';
import handleUpdate from '../utilities/handleUpdate';

const EditCol = ({ item, column, runFetch, setRunFetch }) => {
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
		if (newItem[column]) {
			item[column] = newItem[column];
			let { error } = await handleUpdate(item);
			if (error) {
				setError(error.message);
			} else {
				setRunFetch(!runFetch);
				setNewItem({
					product: '',
					category: '',
					quantity: 0,
					price_each: '',
				});
				setEdit({
					id: null,
					active: false,
				});
			}
		} else {
			setEdit({
				id: null,
				active: false,
			});
		}
	};

	const inputRef = useRef(null);

	useEffect(() => {
		inputRef.current?.focus();
	}, [item]);

	return (
		<form
			className='flex items-center gap-1'
			onSubmit={event => handleSubmit(event)}
		>
			<input
				ref={inputRef}
				className='rounded p-2 w-44 border'
				name={column}
				type='text'
				placeholder={item.column}
				value={newItem.column}
				onChange={handleFormChange}
			/>
			<button className='cursor-pointer'>{checkIcon}</button>
		</form>
	);
};

export default EditCol;
