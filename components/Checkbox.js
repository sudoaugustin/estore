const Checkbox = ({ label, name, inputRef, ...rest }) => (
  <fieldset className='inline-flex items-center space-x-1.5'>
    <input
      id={name}
      ref={inputRef}
      type='checkbox'
      {...rest}
      className='w-4 h-4 rounded border inline-block focus:ring focus:ring-teal-100 checked:bg-teal-600 checked:border-transparent duration-300 appearance-none select-none cursor-pointer'
    />
    <label htmlFor={name} className='text-gray-800 mt-0.5 cursor-pointer'>
      {label}
    </label>
  </fieldset>
);
export default Checkbox;
