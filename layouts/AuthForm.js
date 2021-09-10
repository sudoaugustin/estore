import { useState } from 'react';
import Image from 'next/image';
import { UsersIcon, ChevronDownIcon } from '@heroicons/react/solid';
import Form from '../components/Form';
import Logo from '../components/PlainLogo';
import carts from '../data/carts.json';
import users from '../data/users.json';
import orders from '../data/orders.json';

const TestUsers = ({ onChange }) => {
  const [show, setShow] = useState(false);
  return (
    <div
      className={`fixed bottom-0 right-[15vw] bg-teal-900 rounded-t-md px-6 py-4 w-72 z-10
             ${show ? 'translate-y-0' : 'translate-y-36'} duration-300`}>
      <div
        className='flex items-center justify-between mb-6 cursor-pointer'
        onClick={() => setShow(!show)}>
        <p className='inline-flex items-end '>
          <UsersIcon className='w-4 text-teal-50 mr-1' />
          <span className='text-white text-sm font-medium uppercase leading-none'>Test users</span>
        </p>
        <ChevronDownIcon className={`text-teal-100 w-5 ${show && 'rotate-180'} duration-300`} />
      </div>
      <ul className='space-y-4'>
        {users.map(({ email, id, name }, i) => (
          <li
            key={i}
            className='flex items-start space-x-3 p-1 rounded-md text-teal-600 hover:text-teal-800 bg-white hover:bg-teal-50 border border-teal-100 duration-300 cursor-pointer'
            onClick={() => {
              setShow(false);
              onChange(i);
            }}>
            <Image
              className='rounded-full'
              src={`/images/users/${id}.jpg`}
              width={40}
              height={40}
            />
            <div>
              <p className='text-sm font-semibold'>{name}</p>
              <span className='text-xs tracking-wide'>{email}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

const AuthForm = ({ type, cart, messages, buttonLabel, setCart, ...rest }) => {
  const [index, setIndex] = useState(0);
  const [state, setState] = useState({});
  const handleSubmit = form => {
    setState({ loading: true });
    const error = checkError(form, messages);
    if (Object.keys(error).length) return setState({ error });
    setTimeout(() => {
      let user = users.filter(user => user.email === form.email)[0];
      const storage = form.remember ? localStorage : sessionStorage;
      storage.setItem('user', JSON.stringify(user));
      storage.setItem('orders', JSON.stringify(orders[user.id]));
      cart.length <= 0 && setCart(carts[user.id]);
      window.location = '/';
    }, 1500);
  };

  return (
    <div className='flex flex-col justify-center items-center h-screen'>
      <div className='fixed inset-0 bg-pattern-polka2'>
        <div className='h-screen w-full absolute top-[-50vh] bg-teal-300 -skew-y-6 ' />
      </div>
      <div className='relative z-10 w-full max-w-lg px-4'>
        <Logo />
        <Form
          {...rest}
          {...state}
          defaults={users[index]}
          buttonLabel={buttonLabel}
          onSubmit={handleSubmit}
        />
      </div>
      <TestUsers
        onChange={index => {
          setState({});
          setIndex(index);
        }}
      />
    </div>
  );
};

export default AuthForm;

function checkError(form, messages) {
  return Object.entries(form).reduce((error, [name, value]) => {
    if (typeof value === 'string' && !value) return { ...error, [name]: messages[name].empty };
    else if (!validateInput({ name, value })) return { ...error, [name]: messages[name].invalid };
    return error;
  }, {});
}

function validateInput({ name, value }) {
  switch (name) {
    case 'email':
      const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(value).toLowerCase());
    case 'password':
      return value.length >= 8;
    case 'username':
      const re1 = /^[a-zA-Z\-]+$/;
      return re1.test(value);

    default:
      return true;
  }
}
