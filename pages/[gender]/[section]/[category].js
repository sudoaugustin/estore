import ProductList from '../../../components/ProductList';
import HeaderSection from '../../../layouts/HeaderSection';
import FooterSection from '../../../layouts/FooterSection';
import Container from '../../../components/Container';

export default function ProductCategory({ products, cart, setCart }) {
  return (
    <div className=''>
      <HeaderSection cart={cart} setCart={setCart} />
      <Container className='py-20 lg:py-28'>
        <ProductList products={products} gridCols='grid-cols-2 md:grid-cols-3 lg:grid-cols-4' />
      </Container>

      <FooterSection />
    </div>
  );
}

export async function getStaticPaths() {
  const routes = [
    'women/clothing/all',
    'women/clothing/dresses',
    'women/clothing/tops&t-shirts',
    'women/clothing/trousers&shorts',

    'women/accessories/all',
    'women/accessories/shoes',
    'women/accessories/bags',
    'women/accessories/glasses',
    'women/accessories/watches',

    'men/clothing/all',
    'men/clothing/tops&t-shirts',
    'men/clothing/trousers&shorts',

    'men/accessories/all',
    'men/accessories/shoes',
    'men/accessories/bags',
    'men/accessories/glasses',
  ];
  const paths = routes.map(route => {
    const [gender, section, category] = route.split('/');
    return { params: { gender, section, category } };
  });
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const products = (await import('../../../data/products.json')).default;
  return {
    props: { products: filterProducts({ products, params }) },
  };
}

function filterProducts({ products, params }) {
  const { gender, section, category } = params;
  return products.filter(
    product =>
      product.gender === gender &&
      product.category.includes(`${section}/${category === 'all' ? '' : category}`)
  );
}
