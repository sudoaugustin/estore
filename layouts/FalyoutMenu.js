import Link from 'next/link';
import { Transition } from '@headlessui/react';
import Featured from '../components/Featured';
import Container from '../components/Container';

const FalyoutMenu = ({ show, sections = [], featured = [] }) => (
  <Transition
    show={show}
    className='hidden lg:block fixed top-14 inset-x-0 z-20 bg-white border-t border-b-2'
    enter='transition ease-out duration-200'
    enterFrom='opacity-0 translate-y-1'
    enterTo='opacity-100 translate-y-0'
    leave='transition ease-in duration-150'
    leaveFrom='opacity-100 translate-y-0'
    leaveTo='opacity-0 translate-y-1'>
    <Container>
      <div className='flex justify-between py-16'>
        {sections.map(({ id, name, items }) => (
          <div key={id}>
            <h2 className='font-medium text-gray-900'>{name}</h2>
            <ul className='mt-6 space-y-6'>
              {items.map(({ name, href }, i) => (
                <li className='text-gray-500 hover:text-gray-800 cursor-pointer' key={i}>
                  <Link href={href}>
                    <span>{name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <Featured products={featured} imageWidth={320} />
      </div>
    </Container>
  </Transition>
);

export default FalyoutMenu;
