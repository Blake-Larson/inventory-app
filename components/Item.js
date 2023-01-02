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
	selectCategory,
}) => {
	const inputRef = useRef(null);

	useEffect(() => {
		inputRef.current?.focus();
	}, [edit]);

	const productEdit = (
		<form
			className='flex items-center gap-1'
			onSubmit={event => {
				item.product = newItem.product;
				updateItem(event, item.id, item);
			}}
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
	const categoryEdit = (
		<form
			className='flex items-center gap-1'
			onSubmit={event => {
				item.category = newItem.category;
				updateItem(event, item.id, item);
			}}
		>
			<select
				className='rounded p-2'
				value={newItem.category ? newItem.category : item.category}
				onChange={handleFormChange}
				name='category'
			>
				<option value=''>--Select a Category--</option>
				{selectCategory}
			</select>
			<button className='cursor-pointer'>{checkIcon}</button>
		</form>
	);
	const quantityEdit = (
		<form
			className='flex items-center gap-1'
			onSubmit={event => {
				item.quantity = newItem.quantity;
				updateItem(event, item.id, item);
			}}
		>
			<input
				className='rounded p-2 w-20'
				name='quantity'
				type='number'
				placeholder={item.quantity}
				value={newItem.quantity ? newItem.quantity : item.quantity}
				onChange={handleFormChange}
			/>
			<button className='cursor-pointer'>{checkIcon}</button>
		</form>
	);
	const price_eachEdit = (
		<form
			className='flex items-center gap-1'
			onSubmit={event => {
				item.price_each = newItem.price_each;
				updateItem(event, item.id, item);
			}}
		>
			<input
				className='rounded p-2 w-20'
				name='price_each'
				type='text'
				placeholder={`${item.price_each}`}
				value={`${newItem.price_each ? newItem.price_each : item.price_each}`}
				onChange={handleFormChange}
			/>
			<button className='cursor-pointer'>{checkIcon}</button>
		</form>
	);

	return (
		<tr className='h-14'>
			<td
				className='cursor-pointer'
				onClick={() => editItem(item.id, 'product')}
			>
				{edit.id === item.id && edit.col === 'product' && edit.active
					? productEdit
					: item.product}
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
