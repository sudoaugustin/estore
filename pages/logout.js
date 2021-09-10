import { useEffect } from 'react';
export default function Logout() {
  useEffect(() => {
    localStorage.clear();
    sessionStorage.clear();
    window.location = '/';
  }, []);
  return (
    <div className='h-screen w-screen flex justify-center items-center'>
      <i className='w-8 h-8 relative inline-flex rounded-full border-4 border-gray-50 after:absolute after:-inset-1 after:rounded-full after:animate-spin after:border-4 after:border-transparent after:border-l-gray-200' />
    </div>
  );
}
