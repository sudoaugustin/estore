import AuthForm from '../layouts/AuthForm';

const SignIn = ({ cart, setCart }) => (
  <AuthForm
    type='SIGN_IN'
    cart={cart}
    title='Sign in to your account'
    inputs={[
      {
        name: 'email',
        type: 'text',
        label: 'Email',
        placeholder: 'you@example.com',
      },
      {
        name: 'password',
        type: 'password',
        label: 'Password',
        placeholder: 'Enter strong password',
      },
      {
        name: 'remember',
        type: 'checkbox',
        label: 'Remember me',
      },
    ]}
    messages={{
      email: { invalid: 'Invalid email address', empty: 'Please enter email' },
      password: { invalid: 'Password minium length is 8', empty: 'Please enter password' },
    }}
    buttonLabel='Sign in'
    setCart={setCart}
  />
);

export default SignIn;
