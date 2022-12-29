import { xIcon } from '../assets/icons/x-icon';

const Item = ({ item, deleteItem }) => {
	return (
		<tr className='h-20'>
			<td>{item.product}</td>
			<td>{item.category}</td>
			<td>{item.quantity}</td>
			<td>{`$${item.price_each}`}</td>
			<td>{`$${item.price_total}`}</td>
			<td>
				<div
					onClick={deleteItem}
					className='hover:opacity-100 opacity-40 rounded-full cursor-pointer'
				>
					{xIcon}
				</div>
			</td>
		</tr>
	);
};
export default Item;
