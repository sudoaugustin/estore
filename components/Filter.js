import { Fragment, useState } from 'react';
import { Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import Checkbox from './Checkbox';
const Filter = ({ title, items, activeItems = [], onClick }) => {
  const [show, setShow] = useState(false);
  return (
    <div className={`relative flex flex-col items-end`}>
      <button
        className='text-gray-600 hover:text-gray-800 font-medium inline-flex items-center space-x-2'
        onClick={() => setShow(!show)}>
        <span>{title}</span>
        <ChevronDownIcon className={`w-5 text-gray-400 ${show && 'rotate-180'} duration-150`} />
      </button>
      <Transition
        as={Fragment}
        show={show}
        enter='transition ease-out duration-150'
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-100'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'>
        <ul className='border p-2 shadow-md rounded-md absolute z-10 right-0 top-8 bg-white min-w-[8rem]'>
          {items.map((item, i) => {
            const isActive = activeItems.includes(item);
            return (
              <li key={i} className='p-2'>
                <Checkbox
                  name={item}
                  label={item}
                  checked={isActive}
                  onChange={() =>
                    onClick(
                      isActive
                        ? activeItems.filter(_item => item !== _item)
                        : [...activeItems, item]
                    )
                  }
                />
              </li>
            );
          })}
        </ul>
      </Transition>
    </div>
  );
};

export default Filter;
