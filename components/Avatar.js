import Image from 'next/image';
import { UserIcon } from '@heroicons/react/solid';
const Avatar = ({ uid, size, onClick }) => (
  <span
    style={{ width: size, height: size }}
    onClick={onClick}
    className='relative rounded-full overflow-hidden cursor-pointer bg-gray-100 ring-1 ring-gray-100'>
    {uid ? (
      <Image
        src={`/images/users/${uid}.jpg`}
        width={size}
        height={size}
        className='ring-2 ring-gray-100'
      />
    ) : (
      <UserIcon className='absolute -inset-1 mt-1 text-gray-300' />
    )}
  </span>
);
export default Avatar;
