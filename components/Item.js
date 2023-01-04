import { useState } from 'react';
import { xIcon } from '../assets/icons/x-icon';
import EditCol from './EditCol';
import handleDelete from '../utilities/handleDelete';

const Item = ({ item, inventory, setInventory, runFetch, setRunFetch }) => {
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

	return (
		<tr className='h-14'>
			<td
				className='cursor-pointer'
				onClick={() => editItem(item.id, 'product')}
			>
				{edit.id === item.id && edit.col === 'product' && edit.active ? (
					<EditCol
						item={item}
						setEdit={setEdit}
						column={'product'}
						formType={'text'}
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
				{edit.id === item.id && edit.col === 'category' && edit.active ? (
					<EditCol
						item={item}
						setEdit={setEdit}
						column={'category'}
						formType={'select'}
						runFetch={runFetch}
						setRunFetch={setRunFetch}
					/>
				) : (
					item.category
				)}
			</td>
			<td
				className='cursor-pointer'
				onClick={() => editItem(item.id, 'quantity')}
			>
				{edit.id === item.id && edit.col === 'quantity' && edit.active ? (
					<EditCol
						item={item}
						setEdit={setEdit}
						column={'quantity'}
						formType={'number'}
						runFetch={runFetch}
						setRunFetch={setRunFetch}
					/>
				) : (
					item.quantity
				)}
			</td>
			<td
				className='cursor-pointer'
				onClick={() => editItem(item.id, 'price_each')}
			>
				{edit.id === item.id && edit.col === 'price_each' && edit.active ? (
					<EditCol
						item={item}
						setEdit={setEdit}
						column={'price_each'}
						formType={'text'}
						runFetch={runFetch}
						setRunFetch={setRunFetch}
					/>
				) : (
					`$${item.price_each}`
				)}
			</td>
			<td>{`$${item.price_total}`}</td>
			<td>
				<div
					onClick={deleteItem}
					className='hover:opacity-100 opacity-40 cursor-pointer hover:bg-red-500 rounded-full ease-in-out duration-300 p-1'
				>
					{xIcon}
				</div>
			</td>
		</tr>
	);
};
export default Item;
