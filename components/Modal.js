import Link from 'next/link';
import { Transition } from '@headlessui/react';
const Modal = ({ show, icon, href, title, message, buttonLabel, onRedirect }) => (
  <Transition
    show={show}
    enter='duration-150 ease-in'
    enterFrom='opacity-0'
    enterTo='opacity-100'
    leave='duration-100 ease-out'
    leaveFrom='opacity-100'
    leaveTo='opacity-0'
    className='fixed z-20 inset-0 bg-gray-400/75 flex justify-center items-center p-4 lg:p-8'>
    <Transition.Child
      enter='duration-150 ease-in'
      enterFrom='scale-0'
      enterTo='scale-1'
      leave='duration-100 ease-out'
      leaveFrom='scale-1'
      leaveTo='scale-0'
      className='bg-white p-4 lg:p-8 rounded-md border shadow-md text-center max-w-md'>
      {icon}
      <h2 className='text-lg lg:text-xl font-semibold text-gray-900 mt-4 mb-2'>{title}</h2>
      <p className='text-sm lg:text-base text-gray-600'>{message}</p>
      <Link href={href}>
        <button
          onClick={onRedirect}
          className='w-full bg-teal-600 hover:bg-teal-800 text-white py-2 mt-6 rounded-md'>
          {buttonLabel}
        </button>
      </Link>
    </Transition.Child>
  </Transition>
);

export default Modal;
