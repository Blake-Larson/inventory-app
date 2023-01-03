import { supabase } from '../lib/initSupabase';

const handleRead = async () => {
	return await supabase.from('inventory').select('*').order('id', true);
};

export default handleRead;
