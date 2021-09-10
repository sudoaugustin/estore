import '../style.css';
import Title from '../components/Title';
import useCart from '../hooks/useCart';

function MyApp({ Component, pageProps }) {
  const [cart, setCart] = useCart();
  return (
    <div className='custom-scrollbar'>
      <Title />
      <Component {...pageProps} cart={cart} setCart={setCart} />
    </div>
  );
}

export default MyApp;
