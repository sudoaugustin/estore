const Button = ({ disable, children, className, onClick }) => (
  <button
    disabled={disable}
    className={`flex justify-center items-center font-semibold focus:ring-4 rounded-md duration-500 relative disabled:opacity-75 disabled:cursor-not-allowed ${className}`}
    onClick={() => !disable && !!onClick && onClick()}>
    {children}
  </button>
);

export default Button;
