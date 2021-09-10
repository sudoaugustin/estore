import Link from 'next/link';
import { useEffect, useState } from 'react';
import Container from '../components/Container';
import ProductImage from '../components/ProductImage';
import HeaderSection from '../layouts/HeaderSection';
import FooterSection from '../layouts/FooterSection';

export default function Orders({ cart, setCart }) {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const orders = localStorage.getItem('orders') || sessionStorage.getItem('orders');
    orders && setOrders(JSON.parse(orders));
  }, []);

  return (
    <div className='bg-gray-100'>
      <HeaderSection cart={cart} setCart={setCart} />
      <Container className='py-20 lg:py-28 space-y-10'>
        <div>
          <h2 className='text-2xl font-bold text-gray-900'>Order history</h2>
          <p className='text-gray-600 mt-4'>Check the status of recent orders and manage returns</p>
        </div>
        <ul className='space-y-16'>
          {orders.reverse().map(({ id, items, status, date }) => {
            const totalAmount = items.reduce((total, { price, qty }) => total + price * qty, 0);
            const details = [
              {
                name: 'Order number',
                value: id,
                classes: { value: 'uppercase' },
              },
              { name: 'Date placed', value: date },
              {
                name: 'Total amount',
                value: totalAmount + ' Ks',
                classes: { value: 'text-gray-800 font-semibold' },
              },
              {
                name: 'Status',
                value: status,
                classes: { value: 'capitalize' },
              },
            ];
            return (
              <li className='border divide-y rounded-md bg-white'>
                <div className='p-4 lg:px-8 lg:py-6 flex justify-between'>
                  <div className='inline-flex space-x-4 sm:space-x-14'>
                    {details.map(({ name, value, classes = {} }) => (
                      <div className='text-sm'>
                        <h2 className='text-gray-900 font-medium'>{name}</h2>
                        <p className={`text-gray-600 mt-1 ${classes.value}`}>{value}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <ul className='grid md:grid-cols-2'>
                  {items.map(({ id, qty, color, name, price }, i) => {
                    const I = i + 1;
                    const length = items.length;
                    const isEven = I % 2 === 0;
                    const borderClass = `${!isEven && 'md:border-r'} md:border-b 
                    ${(I === length || (!isEven && I === length - 1)) && 'md:border-b-0'}`;
                    return (
                      <li className={`inline-flex space-x-3 p-4 lg:p-8 border-b ${borderClass}`}>
                        <ProductImage width={60} path={`products/${id}/${color}/3`} />
                        <div className='flex-1 flex flex-col justify-between'>
                          <div className='inline-flex justify-between'>
                            <h2 className='font-medium text-gray-600'>{name}</h2>
                            <h4 className='font-semibold text-gray-900'>{price} Ks</h4>
                          </div>
                          <div className='inline-flex justify-between text-sm'>
                            <h2 className='text-gray-600'>Qty {qty}</h2>
                            <Link href={`/products/${id}`}>
                              <span className='text-teal-600 hover:text-teal-800 rounded-md cursor-pointer font-medium duration-300'>
                                View product
                              </span>
                            </Link>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </li>
            );
          })}
        </ul>
      </Container>
      <FooterSection />
    </div>
  );
}
