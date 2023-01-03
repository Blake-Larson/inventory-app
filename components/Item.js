import { useEffect, useRef, useState } from 'react';
import { xIcon } from '../assets/icons/x-icon';
import EditCol from './EditCol';
import handleDelete from '../utilities/handleDelete';

const Item = ({ item, inventory, setInventory }) => {
	const deleteItem = async () => {
		try {
			await handleDelete(item.id);
			setInventory(inventory.filter(x => x.id != item.id));
		} catch (error) {
			console.log('error', error);
		}
	};

	const [edit, setEdit] = useState({
		id: null,
		active: false,
	});

	const editItem = async (id, col) => {
		setEdit({
			id: id,
			col: col,
			active: true,
		});
	};

	// const categoryEdit = (
	// 	<form
	// 		className='flex items-center gap-1'
	// 		onSubmit={event => {
	// 			item.category = newItem.category;
	// 			updateItem(event, item.id, item);
	// 		}}
	// 	>
	// 		<select
	// 			className='rounded p-2'
	// 			value={newItem.category ? newItem.category : item.category}
	// 			onChange={handleFormChange}
	// 			name='category'
	// 		>
	// 			<option value=''>--Select a Category--</option>
	// 			{selectCategory}
	// 		</select>
	// 		{/* <button className='cursor-pointer'>{checkIcon}</button> */}
	// 	</form>
	// );
	// const quantityEdit = (
	// 	<form
	// 		className='flex items-center gap-1'
	// 		onSubmit={event => {
	// 			if (newItem.quantity) {
	// 				item.quantity = newItem.quantity;
	// 				updateItem(event, item.id, item);
	// 			} else {
	// 				event.preventDefault();
	// 				setEdit({
	// 					id: null,
	// 					active: false,
	// 				});
	// 			}
	// 		}}
	// 	>
	// 		<input
	// 			className='rounded p-2 w-20'
	// 			name='quantity'
	// 			type='number'
	// 			placeholder={item.quantity}
	// 			value={newItem.quantity} //{newItem.quantity ? newItem.quantity : item.quantity}
	// 			onChange={handleFormChange}
	// 		/>
	// 		{/* <button className='cursor-pointer'>{checkIcon}</button> */}
	// 	</form>
	// );
	// const price_eachEdit = (
	// 	<form
	// 		className='flex items-center gap-1'
	// 		onSubmit={event => {
	// 			if (newItem.price_each) {
	// 				item.price_each = newItem.price_each;
	// 				updateItem(event, item.id, item);
	// 			} else {
	// 				event.preventDefault();
	// 				setEdit({
	// 					id: null,
	// 					active: false,
	// 				});
	// 			}
	// 		}}
	// 	>
	// 		<input
	// 			className='rounded p-2 w-20'
	// 			name='price_each'
	// 			type='text'
	// 			placeholder={`${item.price_each}`}
	// 			value={newItem.price_each} //`${newItem.price_each ? newItem.price_each : item.price_each}`}
	// 			onChange={handleFormChange}
	// 		/>
	// 		{/* <button className='cursor-pointer'>{checkIcon}</button> */}
	// 	</form>
	// );

	return (
		<tr className='h-14'>
			<td
				className='cursor-pointer'
				onClick={() => editItem(item.id, 'product')}
			>
				{edit.id === item.id && edit.col === 'product' && edit.active ? (
					<EditCol
						item={item}
						column={'product'}
						runFetch={runFetch}
						setRunFetch={setRunFetch}
					/>
				) : (
					item.product
				)}
			</td>
			<td
				className='cursor-pointer'
				onClick={() => editItem(item.id, 'category')}
			>
				{edit.id === item.id && edit.col === 'category' && edit.active
					? categoryEdit
					: item.category}
			</td>
			<td
				className='cursor-pointer'
				onClick={() => editItem(item.id, 'quantity')}
			>
				{edit.id === item.id && edit.col === 'quantity' && edit.active
					? quantityEdit
					: item.quantity}
			</td>
			<td
				className='cursor-pointer'
				onClick={() => editItem(item.id, 'price_each')}
			>
				{edit.id === item.id && edit.col === 'price_each' && edit.active
					? price_eachEdit
					: `$${item.price_each}`}
			</td>
			<td>{`$${item.price_total}`}</td>
			<td>
				<div
					onClick={deleteItem}
					className='hover:opacity-100 opacity-40 cursor-pointer'
				>
					{xIcon}
				</div>
			</td>
		</tr>
	);
};
export default Item;
