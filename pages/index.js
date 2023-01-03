import { supabase } from '../lib/initSupabase';
import { Auth } from '@supabase/ui';
import Inventory from '../components/Inventory';

export default function IndexPage() {
	const { user } = Auth.useUser();

	return (
		<div className='w-full h-full bg-gray-300'>
			{!user ? (
				<div className='w-full h-full flex flex-col justify-center items-center p-4'>
					<div>
						<Auth
							supabaseClient={supabase}
							socialLayout='horizontal'
							socialButtonSize='xlarge'
						/>
					</div>
				</div>
			) : (
				<div className='w-full h-full flex flex-col items-center p-4'>
					<h1 className='text-7xl font-bold'>Inventory</h1>
					<h2 className='mb-12 text-xl'>*Click any item to edit it.</h2>
					<Inventory user={supabase.auth.user()} />
					<button
						className='btn-black w-24 mt-12'
						onClick={async () => {
							const { error } = await supabase.auth.signOut();
							if (error) console.log('Error logging out:', error.message);
						}}
					>
						Logout
					</button>
				</div>
			)}
		</div>
	);
}
