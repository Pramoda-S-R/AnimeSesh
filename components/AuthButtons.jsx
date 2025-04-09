'use client';

import supabase from '../lib/supabaseClient';

export default function AuthButtons() {
  const signInWithProvider = async (provider) => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${location.origin}/auth/callback`, // or a custom callback route
      },
    });
    if (error) console.error('OAuth login error:', error.message);
  };

  return (
    <div>
      <button onClick={() => signInWithProvider('google')}>
        Sign in with Google
      </button>
      <button onClick={() => signInWithProvider('github')}>
        Sign in with GitHub
      </button>
    </div>
  );
}
