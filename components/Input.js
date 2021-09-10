import ErrorIcon from '@heroicons/react/solid/ExclamationCircleIcon';
const Input = ({ name, type = 'text', error, label, inputRef, placeholder, defaultValue }) => {
  return (
    <fieldset>
      <label
        htmlFor={name}
        children={label}
        className='block font-medium text-gray-600 mb-2 text-sm'
      />
      <input
        id={name}
        ref={inputRef}
        type={type}
        readOnly={true}
        className='text-gray-900 border-2 rounded-md outline-none p-2 focus:border-teal-300 focus:ring-4 ring-teal-100 duration-300 empty:bg-gray-50 w-full'
        placeholder={placeholder}
        defaultValue={defaultValue}
        autoComplete='off'
      />
      <p
        className={`text-rose-600 text-sm h-4 mt-2 flex duration-300 
        ${error ? 'opacity-100' : 'opacity-0'}`}>
        <ErrorIcon className='w-4 mr-1 text-rose-500' />
        {error}
      </p>
    </fieldset>
  );
};

export default Input;
