import { useState, useEffect } from 'react';
import { supabase } from '../lib/initSupabase';
import Alert from './Alert';
import Item from './Item';
import { capitalize } from '../services/stringHooks';

const Inventory = ({ user }) => {
	const [inventory, setInventory] = useState([]);
	const [newItem, setNewItem] = useState({
		product: '',
		category: '',
		quantity: 0,
		price_each: '',
	});
	const [errorText, setError] = useState('');
	const [runFetch, setRunFetch] = useState(false);
	const categories = [
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

	useEffect(() => {
		fetchInventory();
	}, [runFetch]);

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
				product: capitalize(newItem.product),
				category: newItem.category ? newItem.category : 'None',
				quantity: newItem.quantity ? newItem.quantity : 0,
				price_each: newItem.price_each ? parseFloat(newItem.price_each) : 0,
				price_total: parseFloat(newItem.price_each) * newItem.quantity,
			})
			.single();
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

	const updateItem = async (event, id) => {
		event.preventDefault();
		let { error } = await supabase
			.from('inventory')
			.update({
				product: capitalize(newItem.product),
			})
			.select('product')
			.eq('id', id);
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
	};

	const deleteItem = async id => {
		try {
			await supabase.from('inventory').delete().eq('id', id);
			setInventory(inventory.filter(x => x.id != id));
		} catch (error) {
			console.log('error', error);
		}
	};

	const [edit, setEdit] = useState({
		id: null,
		active: false,
	});

	const editItem = async id => {
		setEdit({
			id: id,
			active: true,
		});
	};

	return (
		<div className='flex flex-col'>
			<h1 className='mb-12'>Inventory</h1>
			{!!errorText && <Alert text={errorText} />}
			<form className='flex gap-2 my-2' onSubmit={addItem}>
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
			<section className='p-5 bg-white shadow overflow-hidden rounded-md'>
				<table className='table-fixed'>
					<thead>
						<tr className='text-left'>
							<th className='w-60'>Product</th>
							<th className='w-52'>Category</th>
							<th className='w-24'>Qty</th>
							<th className='w-24'>
								Price<span className='opacity-60 font-normal'>(Each)</span>
							</th>
							<th className='w-24'>
								Price<span className='opacity-60 font-normal'>(Total)</span>
							</th>
						</tr>
					</thead>
					<tbody className='gap-5'>
						{inventory.map(item => (
							<Item
								key={item.id}
								item={item}
								deleteItem={() => deleteItem(item.id)}
								newItem={newItem}
								handleFormChange={handleFormChange}
								updateItem={updateItem}
								edit={edit}
								editItem={editItem}
							/>
						))}
					</tbody>
				</table>
			</section>
		</div>
	);
};
export default Inventory;
