import { useState, useEffect } from 'react';
import { Transition } from '@headlessui/react';
import { XIcon, TagIcon, CheckCircleIcon } from '@heroicons/react/solid';
import Button from '../../components/Button';
import ProductImage from '../../components/ProductImage';
import HeaderSection from '../../layouts/HeaderSection';
import FooterSection from '../../layouts/FooterSection';
import Container from '../../components/Container';

const CollectionList = ({ collections, onClick }) => (
  <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 border-l-2 border-t-2'>
    {collections.map((collection, i) => (
      <div
        key={i}
        className={`cursor-pointer border-r-2 border-b-2 p-4 lg:p-8 hover:bg-gray-50 duration-200`}
        onClick={() => onClick(collection)}>
        <ProductImage width={500} path={`collections/${collection.id}`} />
        <p className='text-lg lg:text-xl font-semibold text-gray-900 mt-2 flex items-center'>
          <TagIcon className='w-4 lg:w-5 text-gray-700 mr-1' />
          <span>{clacTotalPrice(collection.items.map(item => item.price))} Ks</span>
        </p>
      </div>
    ))}
  </div>
);

const Collections = ({ collections, cart, setCart }) => {
  const [activeCollection, setActiveCollection] = useState({});
  const [selectedItems, setSelectedItems] = useState([]);
  useEffect(() => {
    activeCollection?.items?.length && setSelectedItems(activeCollection.items);
  }, [activeCollection]);

  return (
    <div>
      <HeaderSection cart={cart} setCart={setCart} />
      <Container className='py-20 lg:py-28'>
        <CollectionList cart={cart} collections={collections} onClick={setActiveCollection} />
      </Container>
      <Transition
        show={Object.keys(activeCollection).length > 0}
        enter='transition-opacity duration-150'
        enterFrom='opacity-0'
        enterTo='opacity-100'
        leave='transition-opacity duration-150'
        leaveFrom='opacity-100'
        leaveTo='opacity-0'
        className='flex justify-center items-center fixed z-20 inset-0 bg-gray-300/50'>
        <div className='relative bg-white overflow-y-auto border p-4 md:p-8 h-full md:h-auto w-full md:w-auto md:rounded-md md:shadow-lg'>
          <XIcon
            className='w-5 text-gray-600 hover:text-gray-800 absolute top-4 right-4 cursor-pointer'
            onClick={() => setActiveCollection({})}
          />
          <h2 className='text-xl font-semibold text-gray-900 -ml-1'>Collection include</h2>
          <div className='flex justify-center flex-wrap sm:flex-nowrap border-b-2 -mx-4 mb-6 py-4 border-dashed'>
            {activeCollection?.items?.map(({ path, price }, i) => {
              const selected = selectedItems.filter(item => path === item.path).length > 0;
              const [id, color] = path.split('.');
              return (
                <div
                  key={i}
                  className={`overflow-hidden inline-flex max-w-[10rem] rounded-xl group cursor-pointer duration-150 relative m-4
                             ${selected && 'ring ring-teal-400 hover:ring-teal-500'}`}
                  onClick={() => {
                    const newItems = selected
                      ? selectedItems.filter(item => path !== item.path)
                      : selectedItems.concat({ path, price });
                    setSelectedItems(newItems);
                  }}>
                  <ProductImage width={200} path={`products/${id}/${color}/3`} />
                  <CheckCircleIcon
                    className={`w-5 md:w-6 absolute top-1 right-1 rounded-full duration-150
                               ${selected ? 'text-teal-500' : 'text-transparent'} `}
                  />
                </div>
              );
            })}
          </div>
          <div>
            <p className='font-medium text-right'>
              <span className='text-gray-600'>Total Price: </span>
              <span className='text-gray-900 w-24 inline-block'>
                {clacTotalPrice(selectedItems.map(({ price }) => price))} Ks
              </span>
            </p>
            <Button
              disable={selectedItems.length < 1}
              className='bg-teal-600 hover:bg-teal-800 text-white py-1.5 px-3 mt-5 float-right'
              onClick={() => {
                setCart([
                  ...cart,
                  ...selectedItems.map(({ path, ...rest }) => {
                    //...rest {name,price,size}
                    const [id, color] = path.split('.');
                    return { id, color, ...rest };
                  }),
                ]);
                setActiveCollection({});
              }}>
              Add to cart
            </Button>
          </div>
        </div>
      </Transition>
      <FooterSection />
    </div>
  );
};

export default Collections;

export async function getStaticPaths() {
  const routes = ['men', 'women', 'all'];
  const paths = routes.map(route => {
    return { params: { gender: route } };
  });
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const { gender } = params;
  const products = (await import('../../data/products.json')).default;
  const collections = (await import('../../data/collections.json')).default;
  const newCollections = collections
    .filter(collection => (gender === 'all' ? true : collection.gender === gender))
    .map(({ id, items }) => {
      const product = items.map(item => {
        const pId = item.split('.')[0];
        const product = products.find(({ id }) => id === pId);
        const size = Object.values(product.items)[0][0].size;
        return { name: product.name, price: product.price, size };
      }, 0);
      const newItems = items.map((item, i) => ({ path: item, ...product[i] }));
      return { id, items: newItems };
    });

  return {
    props: { collections: newCollections },
  };
}

function clacTotalPrice(prices = []) {
  return prices.reduce((total, price) => total + price, 0);
}
