import { useEffect, useRef, useState } from 'react';
import { xIcon } from '../assets/icons/x-icon';
import { checkIcon } from '../assets/icons/check-icon';

const Item = ({
	item,
	deleteItem,
	newItem,
	handleFormChange,
	updateItem,
	edit,
	editItem,
}) => {
	const inputRef = useRef(null);

	useEffect(() => {
		inputRef.current?.focus();
	}, [edit]);

	const productEdit = (
		<form
			className='flex items-center gap-1'
			onSubmit={event => updateItem(event, item.id)}
		>
			<input
				ref={inputRef}
				className='rounded p-2 w-44 border'
				name='product'
				type='text'
				placeholder={item.product}
				value={newItem.product ? newItem.product : item.product}
				onChange={handleFormChange}
			/>
			<button className='cursor-pointer'>{checkIcon}</button>
		</form>
	);

	return (
		<tr className='h-14'>
			<td className='cursor-pointer' onClick={() => editItem(item.id)}>
				{edit.id === item.id && edit.active ? productEdit : item.product}
			</td>
			<td>{item.category}</td>
			<td>{item.quantity}</td>
			<td>{`$${item.price_each}`}</td>
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
