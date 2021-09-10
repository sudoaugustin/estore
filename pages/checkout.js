import { useState, useEffect } from 'react';
import Logo from '../components/Logo';
import Input from '../components/Input';
import Modal from '../components/Modal';
import Button from '../components/Button';
import { clacTotalPrice, groupCartProducts } from '../functions';
import { CheckIcon, LockClosedIcon } from '@heroicons/react/outline';

export default function Checkout({ cart, setCart }) {
  const fees = 5000;
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const [user, setUser] = useState();
  const [isOrdered, setIsOrdered] = useState(false);
  const subtotal = clacTotalPrice(cart);
  const taxes = subtotal * 0.15;
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || sessionStorage.getItem('user'));
    setUser(user);
  }, []);
  return (
    <div className='p-4 lg:p-8'>
      <Modal
        show={isOrdered}
        icon={
          <i className='p-2 rounded-full bg-green-100 inline-block'>
            <CheckIcon className='w-8 text-green-600' />
          </i>
        }
        title='Order Successful'
        message='Order has been sent to our team. Your items will be shipped within 2-5 bussiness days.'
        buttonLabel='Go back to home'
        href='/'
        onRedirect={() => setCart([])}
      />
      <Modal
        show={user === null}
        icon={
          <i className='p-2 rounded-full bg-teal-100 inline-block'>
            <LockClosedIcon className='w-8 text-teal-600' />
          </i>
        }
        title='You need to login'
        message='In order to prevent fraud and spam, we allow only logged in user to checkout'
        buttonLabel='Login to acoount'
        href='/signin'
      />
      <div className='fixed inset-0 bg-pattern-polka2'>
        <div className='h-screen w-full absolute top-[-50vh] -skew-y-12 flex items-end justify-between bg-gray-50/80'>
          <i className='block w-1/4 h-10 bg-cyan-400/90 relative top-10' />
          <i className='block w-1/4 h-10 bg-cyan-400/90' />
          <i className='block w-40 h-10 bg-fuchsia-400 absolute -bottom-4 ml-8 lg:ml-16 mix-blend-multiply ' />
        </div>
      </div>
      <div className='max-w-lg mx-auto p-8 rounded-lg bg-white shadow-md border z-10 relative'>
        <div className='text-center'>
          <Logo />
        </div>
        <form
          className='pt-12 space-y-6'
          onSubmit={e => {
            e.preventDefault();
            setIsOrdered(true);
            const orders = JSON.parse(localStorage.getItem('orders')) || [];
            const date = new Date();

            localStorage.setItem(
              'orders',
              JSON.stringify([
                ...orders,
                {
                  id: '55e48652',
                  items: groupCartProducts(cart),
                  status: 'order placed',
                  date: `${months[date.getMonth()]} ${date.getDate()}, ${date
                    .getFullYear()
                    .toString()
                    .substring(2)}`,
                },
              ])
            );
          }}>
          <Input label='Email address' defaultValue={user?.email} />
          <Input label='Name on card' defaultValue={user?.name} />
          <Input label='Card number' defaultValue={user?.card?.no} />
          <div className='flex space-x-6'>
            <Input label='Expiration date(MM/YY)' defaultValue={user?.card?.exp} />
            <Input label='CVC' type='password' defaultValue={user?.card?.cvc} />
          </div>
          <Input label='Address' defaultValue={user?.location?.address} />
          <div className='flex space-x-6'>
            <Input label='City' defaultValue={user?.location?.city} />
            <Input label='Province' defaultValue={user?.location?.province} />
            <Input label='Postal code' defaultValue={user?.location?.postal} />
          </div>
          <div className='text-sm space-y-5 py-5 border-t'>
            <div className='flex justify-between'>
              <span className='text-gray-600'>Subtotal</span>
              <span className='text-gray-900 font-semibold'>{subtotal} Ks</span>
            </div>
            <div className='flex justify-between'>
              <span className='text-gray-600'>Shipping</span>
              <span className='text-gray-900 font-semibold'>{fees} Ks</span>
            </div>
            <div className='flex justify-between'>
              <span className='text-gray-600'>Taxes</span>
              <span className='text-gray-900 font-semibold'>{taxes} Ks</span>
            </div>
          </div>
          <Button className='bg-teal-600 hover:bg-teal-800 text-white w-full py-2'>
            Pay {subtotal + fees + taxes}Ks
          </Button>
        </form>
      </div>
    </div>
  );
}
