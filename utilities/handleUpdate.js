import { supabase } from '../lib/initSupabase';

const handleUpdate = async item => {
	return await supabase
		.from('inventory')
		.update({
			product: capitalize(item.product),
			category: item.category,
			quantity: item.quantity,
			price_each: parseFloat(item.price_each),
			price_total: parseFloat(
				(parseFloat(item.price_each) * item.quantity).toFixed(2)
			),
		})
		.eq('id', item.id);
};

export default handleUpdate;
