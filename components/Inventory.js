import { useState, useEffect } from 'react';
import Alert from './Alert';
import Item from './Item';
import handleRead from '../utilities/handleRead';
import ItemAdd from './ItemAdd';

const Inventory = () => {
	const [inventory, setInventory] = useState([]);
	const [errorText, setError] = useState('');
	const [runFetch, setRunFetch] = useState(false);

	useEffect(() => {
		(async () => {
			let { data: inventory, error } = await handleRead();
			if (error) {
				console.log('error', error);
			} else {
				setInventory(inventory);
			}
		})();
	}, [runFetch]);

	return (
		<div className='flex flex-col'>
			<h1 className='text-7xl font-bold'>Inventory</h1>
			<h2 className='mb-12 text-xl'>*Click any item to edit it.</h2>
			{!!errorText && <Alert text={errorText} />}
			<ItemAdd inventory={inventory} setInventory={setInventory} />
			<section className='p-5 bg-white shadow overflow-hidden rounded-md'>
				<table className='table-fixed'>
					<thead>
						<tr className='text-left'>
							<th className='w-60'>Product</th>
							<th className='w-60'>Category</th>
							<th className='w-28'>Qty</th>
							<th className='w-28'>
								Price<span className='opacity-60 font-normal'>(Each)</span>
							</th>
							<th className='w-28'>
								Price<span className='opacity-60 font-normal'>(Total)</span>
							</th>
						</tr>
					</thead>
					<tbody className='gap-5'>
						{inventory.map(item => (
							<Item
								key={item.id}
								item={item}
								inventory={inventory}
								setInventory={setInventory}
								runFetch={runFetch}
								setRunFetch={setRunFetch}
							/>
						))}
					</tbody>
				</table>
			</section>
		</div>
	);
};
export default Inventory;
