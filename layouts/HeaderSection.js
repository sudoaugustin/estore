import Link from 'next/link';
import { useState, useEffect, Fragment } from 'react';
import FalyoutMenu from './FalyoutMenu';
import NavBarMobile from './NavBarMobile';
import ShoppingCart from './ShoppingCart';
import Logo from '../components/Logo';
import Avatar from '../components/Avatar';
import Container from '../components/Container';
import { OfficeBuildingIcon } from '@heroicons/react/solid';
import { ShoppingCartIcon, MenuIcon, NewspaperIcon, LogoutIcon } from '@heroicons/react/outline';
import { Transition } from '@headlessui/react';

const AuthLinks = ({ links }) => (
  <ul className='hidden lg:flex divide-x'>
    {links.map(({ id, name, href }) => (
      <Link key={id} href={href}>
        <li className='px-4 text-gray-400 hover:text-gray-600 duration-300 cursor-pointer'>
          {name}
        </li>
      </Link>
    ))}
  </ul>
);

const HeaderSection = ({ cart, setCart }) => {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [showUser, setShowUser] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selected, setSelected] = useState('');
  const navigation = {
    categories: [
      {
        id: 'women',
        name: 'Women',
        href: '/women',
        featured: [
          { href: '/collections/women', path: 'collections/aUi6j41f', title: 'Summer Collection' },
          { href: '/products/8kWZB', path: 'products/8kWZB/414F5C/2', title: 'Trending' },
        ],
        sections: [
          {
            id: 'clothing',
            name: 'Clothing',
            items: [
              { name: 'Dresses', href: '/women/clothing/dresses' },
              {
                name: 'Tops & T-shirts',
                href: '/women/clothing/tops&t-shirts',
              },
              {
                name: 'Trousers & Shorts',
                href: '/women/clothing/trousers&shorts',
              },
              { name: 'Browse All', href: '/women/clothing/all' },
            ],
          },
          {
            id: 'accessories',
            name: 'Accessories',
            items: [
              { name: 'Shoes', href: '/women/accessories/shoes' },
              { name: 'Bags', href: '/women/accessories/bags' },
              { name: 'Glasses', href: '/women/accessories/glasses' },
              { name: 'Watches', href: '/women/accessories/watches' },
              { name: 'Browse All', href: '/women/accessories/all' },
            ],
          },
        ],
      },
      {
        id: 'men',
        name: 'Men',
        featured: [
          { href: '/collections/men', path: 'collections/KKPG9KJI', title: 'Summer Collection' },
          { href: '/products/49tJi', path: 'products/49tJi/584960/1', title: 'Trending' },
        ],
        sections: [
          {
            id: 'clothing',
            name: 'Clothing',
            items: [
              {
                name: 'Tops & T-shirts',
                href: '/men/clothing/tops&t-shirts',
              },
              {
                name: 'Trousers & Shorts',
                href: '/men/clothing/trousers&shorts',
              },
              { name: 'Browse All', href: '/men/clothing/all' },
            ],
          },
          {
            id: 'accessories',
            name: 'Accessories',
            items: [
              { name: 'Shoes', href: '/men/accessories/shoes' },
              { name: 'Bags', href: '/men/accessories/bags' },
              { name: 'Glasses', href: '/men/accessories/glasses' },
              { name: 'Browse All', href: '/men/accessories/all' },
            ],
          },
        ],
      },
    ],
    pages: [
      {
        id: 'stores',
        icon: <OfficeBuildingIcon className='w-5' />,
        name: 'Stores',
        href: '/stores',
      },
    ],
    auths: [
      { id: 'signin', name: 'Sign in', href: '/signin' },
      { id: 'signup', name: 'Create an account', href: '/signup' },
    ],
    user: [
      {
        id: 'orders',
        name: 'Order History',
        icon: <NewspaperIcon className='w-5' />,
        href: '/orders',
      },
      { id: 'logout', name: 'Logout', icon: <LogoutIcon className='w-5' />, href: '/logout' },
    ],
  };
  useEffect(() => {
    const user = localStorage.getItem('user') || sessionStorage.getItem('user');
    setUser(JSON.parse(user));
  }, []);

  return (
    <div>
      <header className='fixed inset-x-0 z-20 bg-gray-100 bg-opacity-25 firefox:bg-opacity-90 border-b backdrop-filter backdrop-blur'>
        <Container>
          <div className='flex items-center justify-center w-full relative h-14'>
            <div className='absolute left-0'>
              <Logo />
            </div>
            <ul className='font-medium space-x-6 text-gray-500 hidden lg:block '>
              {navigation.categories.map(({ id, name }) => (
                <li
                  key={id}
                  className={`inline duration-300 cursor-pointer py-4 border-b-2 ${
                    open && id === selected
                      ? 'text-teal-600 border-teal-500'
                      : 'text-gray-600 hover:text-gray-900 border-transparent'
                  }`}
                  onClick={() => {
                    setOpen(!(open && id === selected));
                    setSelected(id);
                  }}>
                  {name}
                </li>
              ))}
              {navigation.pages.map(({ id, name, href }) => (
                <Link key={id} href={href}>
                  <li className='text-gray-600 hover:text-gray-900 inline cursor-pointer duration-300'>
                    {name}
                  </li>
                </Link>
              ))}
            </ul>
            <div className='space-x-6 inline-flex items-center absolute right-0'>
              {!user && <AuthLinks links={navigation.auths} />}
              {user && (
                <div className='inline-flex flex-col items-center relative'>
                  <Avatar uid={user.id} size={28} onClick={() => setShowUser(!showUser)} />
                  <Transition
                    as={Fragment}
                    show={showUser}
                    enter='duration-150 ease-in'
                    enterFrom='opacity-0'
                    enterTo='opacity-100'
                    leave='duration-75 ease-out'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'>
                    <ul className='bg-white rounded-md border shadow-md absolute mt-8 w-44 p-2'>
                      {navigation.user.map(({ id, href, icon, name }) => (
                        <Link key={id} href={href}>
                          <li className='inline-flex items-center p-2 text-gray-700 hover:text-gray-800 hover:bg-gray-50 rounded-md w-full space-x-1 cursor-pointer duration-300'>
                            <i className='text-gray-500'>{icon}</i>
                            <span>{name}</span>
                          </li>
                        </Link>
                      ))}
                    </ul>
                  </Transition>
                </div>
              )}
              <span className='relative cursor-pointer' onClick={() => setShowCart(true)}>
                <ShoppingCartIcon className='w-6 text-gray-400 hover:text-gray-700 duration-500' />
                {cart.length ? (
                  <i className='not-italic text-xs font-semibold text-white bg-teal-600 rounded-full inline-flex justify-center items-center w-4 h-4 absolute -bottom-1 -right-1'>
                    {cart.length}
                  </i>
                ) : undefined}
              </span>
              <MenuIcon
                onClick={() => setMobileOpen(true)}
                className='w-6 lg:hidden text-gray-400  hover:text-gray-700 duration-500 cursor-pointer'
              />
            </div>
          </div>
        </Container>
      </header>
      <NavBarMobile
        logged={!!user}
        show={mobileOpen}
        onHide={() => setMobileOpen(false)}
        {...navigation}
      />
      <FalyoutMenu show={open} {...navigation.categories.filter(({ id }) => id === selected)[0]} />
      <ShoppingCart
        show={showCart}
        cart={cart}
        setCart={setCart}
        onHide={() => setShowCart(false)}
      />
    </div>
  );
};

export default HeaderSection;
