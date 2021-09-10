import Link from 'next/link';
import { useState } from 'react';
import { Transition } from '@headlessui/react';
import { XIcon, ArrowSmRightIcon } from '@heroicons/react/solid';
import Featured from '../components/Featured';

const NavBarMobile = ({ show, pages, auths, logged, categories, onHide }) => {
  const [selected, setSelected] = useState(0);
  const buttonClasses = {
    signin: 'bg-teal-600 text-white',
    signup: 'text-gray-600',
  };
  return (
    <Transition
      show={show}
      unmount={false}
      className='fixed z-30 top-0 inset-x-0 h-full lg:hidden overflow-y-auto scrollbar-hidden p-4 bg-gray-600/25'
      enter='ease-out duration-200'
      enterFrom='scale-0 opacity-0'
      enterTo='scale-100 opacity-100'
      leave='ease-out duration-150'
      leaveFrom='scale-75 opacity-100'
      leaveTo='scale-0 opacity-0'>
      <div className='bg-white z-30 rounded-lg shadow-md overflow-hidden relative'>
        <XIcon
          onClick={onHide}
          className='absolute w-5 text-gray-400 right-5 top-5 cursor-pointer'
        />
        <div className='border-b-2 border-dashed p-6'>
          <ul className='mb-8 space-x-4'>
            {categories.map(({ name }, i) => (
              <li
                key={i}
                className={`inline border-b-2 p-2 duration-300 select-none cursor-pointer font-medium
                   ${
                     selected === i
                       ? 'border-teal-600 text-teal-600'
                       : 'border-transparent text-gray-900'
                   }`}
                onClick={() => setSelected(i)}>
                {name}
              </li>
            ))}
          </ul>
          <div className='space-y-8'>
            <Featured products={categories[selected].featured} />
            <div className='space-y-8 font-medium'>
              {categories[selected].sections.map(({ name, items }, i) => (
                <div key={i}>
                  <h2 className='text-gray-400 uppercase tracking-wide text-xs'>{name}</h2>
                  <ul className='grid grid-cols-2 gap-4 md:gap-x-10 mt-4 text-gray-900 text-sm md:text-base'>
                    {items.map(({ name, href }, i) => (
                      <Link key={i} href={href}>
                        <li className='cursor-pointer'>{name}</li>
                      </Link>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
        <ul className='px-6 py-4'>
          {pages.map(({ icon, name, href }, i) => (
            <Link key={i} href={href}>
              <li className='inline-flex space-x-2 cursor-pointer'>
                <i className='text-gray-400'>{icon}</i>
                <span className='text-gray-900 font-medium'>{name}</span>
              </li>
            </Link>
          ))}
        </ul>
        {!logged && (
          <div className='py-6 space-x-2 text-center bg-gray-50'>
            {auths.map(({ id, name, href }, i) => (
              <Link key={i} href={href}>
                <p
                  className={`inline-flex items-center px-4 space-x-0.5 py-1.5 rounded-full font-semibold text-sm cursor-pointer ${buttonClasses[id]}`}>
                  <span>{name}</span>
                  {name === 'Sign in' && <ArrowSmRightIcon className='w-4 mt-0.5' />}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </Transition>
  );
};

export default NavBarMobile;
