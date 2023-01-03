import { supabase } from '../lib/initSupabase';

const handleDelete = async id => {
	try {
		let res = await supabase.from('inventory').delete().eq('id', id);
	} catch (error) {
		console.log('error', error);
	}
};

export default handleDelete;
