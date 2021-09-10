import AuthForm from '../layouts/AuthForm';

const SignUp = ({ cart, setCart }) => (
  <AuthForm
    type='SIGN_UP'
    cart={cart}
    title='Create your Estore account'
    inputs={[
      {
        name: 'name',
        type: 'text',
        label: 'Name',
        placeholder: 'John Doe',
      },
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
    ]}
    messages={{
      name: { invalid: 'Name can contain only letters', empty: 'Please enter name' },
      email: { invalid: 'Invalid email address', empty: 'Please enter email' },
      password: { invalid: 'Password minium length is 8', empty: 'Please enter password' },
    }}
    buttonLabel='Create account'
    setCart={setCart}
  />
);

export default SignUp;
