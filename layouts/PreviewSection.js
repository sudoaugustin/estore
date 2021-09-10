import Link from 'next/link';
import Button from '../components/Button';
import Container from '../components/Container';
import ProductList from '../components/ProductList';

const PreviewSection = ({ trendings, favourites }) => (
  <div className=' bg-gray-50 py-14 lg:py-28'>
    <Container className='space-y-20 lg:space-y-28'>
      <ProductList
        title='Trending Products'
        link={{ label: 'See everything', href: '/category/trending' }}
        products={trendings}
        gridCols='grid-cols-2 md:grid-cols-4'
      />
      <div className='aspect-w-5 aspect-h-5 md:aspect-h-2 lg:rounded-lg overflow-hidden flex items-center -mx-4 lg:mx-0'>
        <img src='/images/store-preview.jpg' className='object-cover' />
        <div className='bg-teal-900/60 flex flex-col items-center justify-center'>
          <h2 className='text-white text-3xl lg:text-4xl font-bold mb-4'>Shop on store</h2>
          <p className='text-teal-50 text-lg lg:text-xl text-center mb-8 mx-4 max-w-xl'>
            Estore has branches on Yangon, Mandalay and Naypyitaw. Credit card, mobile money, mobile
            banking and cash payments are accpected.
          </p>
          <Link href='/stores'>
            <button className='text-teal-900 bg-white font-semibold hover:bg-gray-100 focus:ring-4 ring-gray-100/75 px-5 py-3 rounded-md duration-300'>
              Find nearby store
            </button>
          </Link>
        </div>
      </div>
      <ProductList
        title='Our Favourites'
        style='simple'
        link={{ label: 'Browse all favourites', href: '/category/trending' }}
        products={favourites}
        gridCols='grid-cols-1 md:grid-cols-3'
        fileIndex={1}
        imageWidth={400}
      />
    </Container>
  </div>
);

export default PreviewSection;
