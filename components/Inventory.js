import { useState, useEffect } from 'react';
import { supabase } from '../lib/initSupabase';
import Alert from './Alert';
import Item from './Item';

const Inventory = ({ user }) => {
	const [inventory, setInventory] = useState([]);
	const [newItem, setNewItem] = useState({
		product: '',
		category: '',
		quantity: 0,
		price_each: 0,
		price_total: 0,
	});
	const [errorText, setError] = useState('');

	function handleFormChange(event) {
		const { name, value, type, checked } = event.target;
		setNewItem(prevItem => ({
			...prevItem,
			[name]: type === 'checkbox' ? checked : value,
		}));
	}

	useEffect(() => {
		fetchInventory();
	}, []);

	const fetchInventory = async () => {
		let { data: inventory, error } = await supabase
			.from('inventory')
			.select('*')
			.order('id', true);
		if (error) {
			console.log('error', error);
		} else {
			setInventory(inventory);
		}
	};

	const addItem = async event => {
		event.preventDefault();
		let { data: product, error } = await supabase
			.from('inventory')
			.insert({
				user_id: user.id,
				product: newItem.product,
				category: newItem.category,
				quantity: newItem.quantity,
				price_each: newItem.price_each,
				price_total: newItem.price_total,
			})
			.single();
		if (error) {
			setError(error.message);
		} else {
			setInventory([...inventory, product]);
			event.target.reset();
		}
	};

	const deleteItem = async id => {
		try {
			await supabase.from('inventory').delete().eq('id', id);
			setInventory(inventory.filter(x => x.id != id));
		} catch (error) {
			console.log('error', error);
		}
	};

	return (
		<div className='w-full'>
			<h1 className='mb-12'>Inventory</h1>
			<form className='flex gap-2 my-2' onSubmit={addItem}>
				<input
					className='rounded w-full p-2'
					name='product'
					type='text'
					placeholder='baseball hat'
					value={newItem.product}
					onChange={handleFormChange}
				/>
				<button className='btn-black'>Add</button>
			</form>
			{!!errorText && <Alert text={errorText} />}
			<div className='bg-white shadow overflow-hidden rounded-md'>
				<table className='table-auto'>
					<thead>
						<tr>
							<th>Product</th>
							<th>Category</th>
							<th>Qty</th>
							<th>
								Price<span className='opacity-70'>(Each)</span>
							</th>
							<th>
								Price<span className='opacity-70'>(Total)</span>
							</th>
						</tr>
					</thead>
					<tbody>
						{inventory.map(item => (
							<Item
								key={item.id}
								item={item}
								//onDelete={() => deleteItem(item.id)}
							/>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};
export default Inventory;
