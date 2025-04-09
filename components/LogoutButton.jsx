'use client';

import supabase from '../lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login'); // or refresh or route to home
  };

  return <button onClick={handleLogout}>Log Out</button>;
}
