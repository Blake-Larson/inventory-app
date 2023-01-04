import { useEffect, useRef, useState } from 'react';
import { checkIcon } from '../assets/icons/check-icon';
import handleUpdate from '../utilities/handleUpdate';
import selectCategory from '../utilities/categoryHelper';

const EditCol = ({
	item,
	column,
	formType,
	setEdit,
	runFetch,
	setRunFetch,
}) => {
	const [newItem, setNewItem] = useState({
		product: '',
		category: '',
		quantity: 0,
		price_each: '',
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
			{formType === 'select' ? (
				<select
					className='rounded p-2'
					value={newItem[column]}
					onChange={handleFormChange}
					name={column}
				>
					<option value=''>--Select a Category--</option>
					{selectCategory}
				</select>
			) : (
				<input
					ref={inputRef}
					className={`rounded p-2 border ${
						column === 'product' ? 'w-44' : 'w-16'
					}`}
					name={column}
					type={formType}
					placeholder={item[column]}
					value={newItem[column]}
					onChange={handleFormChange}
				/>
			)}
			<button className='cursor-pointer hover:bg-green-500 rounded-full ease-in-out duration-300 p-1'>
				{checkIcon}
			</button>
		</form>
	);
};

export default EditCol;
