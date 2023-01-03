import { supabase } from '../lib/initSupabase';
import { capitalize } from '../utilities/stringHooks';

const handleCreate = async () => {
	return await supabase
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
};

export default handleCreate;
