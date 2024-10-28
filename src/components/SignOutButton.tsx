'use client';
import React from 'react';
import { LogOutIcon } from 'lucide-react';
import { handleCommonSignOut } from '@/app/libs/handleGoogleSignIn';


const SignOutButton = () => {
  const handleSignOut = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    await handleCommonSignOut();
  };

  return (
    <form onSubmit={handleSignOut}> 
      <button
        type="submit"
        className="font-medium border-2 border-gray-200 text-gray-900 py-2 px-4 rounded-md text-sm hover:bg-gray-100 flex gap-2 items-center"
      >
        <LogOutIcon /> Sign out
      </button>
    </form>
  );
};

export default SignOutButton;