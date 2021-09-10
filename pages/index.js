import HeroSection from '../layouts/HeroSection';
import HeaderSection from '../layouts/HeaderSection';
import FooterSection from '../layouts/FooterSection';
import PreviewSection from '../layouts/PreviewSection';

export default function Home({ products, cart, setCart }) {
  return (
    <div>
      <HeaderSection cart={cart} setCart={setCart} />
      <HeroSection />
      <PreviewSection {...products} />
      <FooterSection />
    </div>
  );
}

export async function getStaticProps() {
  const products = await import('../data/products.json');
  return {
    props: {
      products: {
        trendings: [products[73], products[1], products[70], products[78]],
        favourites: [products[14], products[57], products[6]],
      },
    },
  };
}
