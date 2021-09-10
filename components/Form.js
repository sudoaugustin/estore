import { useRef, useEffect, useState } from 'react';
import Input from './Input';
import Button from './Button';
import Checkbox from './Checkbox';
import Arrow from '../components/Arrow';
import Loading from '../components/Loading';

const Remember = props => (
  <div className='flex justify-between items-center'>
    <Checkbox {...props} />
    <a className='text-teal-400 font-medium text-sm mt-1'>Forget password?</a>
  </div>
);

const Form = ({ title, inputs, loading = false, error = {}, defaults, buttonLabel, onSubmit }) => {
  const refs = inputs.map(() => useRef());

  useEffect(() => {
    const timeouts = inputs.map(({ type, name }, i) => {
      const rate = 50;
      const ms = inputs.slice(0, i).reduce((t, { name }) => t + defaults[name].length * rate, 0);
      return setTimeout(() => {
        const element = refs[i].current;
        element.value = '';
        if (type === 'remember' || type === 'checkbox') {
          !element.checked && element.click();
        } else {
          fillInput({ rate, element, defaultValue: defaults[name] });
        }
      }, ms);
    });
    return () => {
      timeouts.map(clearTimeout);
    };
  }, [defaults]);

  const handleSubmit = e => {
    e.preventDefault();
    const form = inputs.reduce((values, { name, type }, i) => {
      const ele = refs[i].current;
      return {
        ...values,
        [name]: type === 'checkbox' ? ele.checked : ele.value,
      };
    }, {});
    onSubmit(form);
  };

  return (
    <div className='bg-white shadow-lg p-6 lg:p-12 md:p-10 rounded-md'>
      <h2 className='text-xl font-semibold text-gray-700'>{title}</h2>
      <form className='mt-12 space-y-4' onSubmit={handleSubmit}>
        {inputs.map((input, i) => {
          const props = { key: i, inputRef: refs[i], ...input };

          switch (input.name) {
            case 'remember':
              return <Remember {...props} />;
            default:
              return <Input {...props} error={error[input.name]} />;
          }
        })}
        <Button className='bg-teal-600 hover:bg-teal-800 focus:bg-teal-800 focus:ring-teal-100 group py-2 w-full'>
          <span className='text-white'>{buttonLabel}</span>
          <i className='absolute right-5 inline-block text-teal-200'>
            {loading ? <Loading /> : <Arrow />}
          </i>
        </Button>
      </form>
    </div>
  );
};

export default Form;

function fillInput({ rate, element, defaultValue }) {
  const interval = setInterval(() => {
    const curLength = element.value.length;
    if (curLength === defaultValue.length) {
      clearInterval(interval);
    } else {
      element.value += defaultValue[curLength];
    }
  }, rate);
}
