import { useState, useEffect } from 'react';
import Link from 'next/link';
import Button from '../../components/Button';
import ProductImage from '../../components/ProductImage';
import HeaderSection from '../../layouts/HeaderSection';
import FooterSection from '../../layouts/FooterSection';
import Container from '../../components/Container';
import PriceIcon from '@heroicons/react/solid/TagIcon';

const Sizes = ({ sizes, stocks, active, onSelect }) => (
  <ul className='flex space-x-4'>
    {sizes.map((size, i) => {
      const isInStock = stocks[size] > 0;
      const isSelected = size === active;
      return (
        <li
          key={i}
          className={`border-2 rounded-md py-2 flex-1 relative duration-300 inline-flex justify-center items-center overflow-hidden
                ${isSelected ? ' bg-teal-600 border-teal-600' : 'border-gray-300'}
                ${!isSelected && isInStock && 'hover:border-gray-400'}
                ${isInStock ? 'cursor-pointer' : 'cursor-not-allowed opacity-40'}`}
          onClick={() => isInStock && !isSelected && onSelect(size)}>
          {!isInStock && <i className='absolute h-0.5 -inset-x-2 rotate-[-27deg] bg-gray-300' />}
          <span className={`font-medium ${isSelected ? 'text-white' : 'text-gray-900'}`}>
            {size}
          </span>
        </li>
      );
    })}
  </ul>
);

const Colors = ({ colors, active, onSelect }) => (
  <div>
    <h4 className='text-gray-600 mb-2'>Color</h4>
    <ul className='flex space-x-2'>
      {colors.map((color, i) => (
        <li
          key={i}
          style={{ borderColor: color === active ? color : 'transparent' }}
          className='p-1 border-2 rounded-full cursor-pointer hover:opacity-80'
          onClick={() => onSelect(color)}>
          <span
            style={{ backgroundColor: color }}
            className='w-6 h-6 rounded-full block ring-1 ring-gray-400/50'
          />
        </li>
      ))}
    </ul>
  </div>
);

const Suggestions = ({ products }) => (
  <div className='space-y-6'>
    <h2 className='text-gray-700 text-lg font-medium'>Customers also bought</h2>
    <div className='grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-8'>
      {products.map(({ id, color, price, name }) => (
        <Link key={id} href={`/products/${id}`}>
          <div key={id} className='group cursor-pointer'>
            <ProductImage width={400} path={`products/${id}/${color}/3`} />
            <p className='text-gray-600 mb-1 text-sm truncate'>{name}</p>
            <span className='text-lg font-medium'>{price} Ks</span>
          </div>
        </Link>
      ))}
    </div>
  </div>
);

const ProductOverview = ({ id, onAdd, name, items, price, description }) => {
  const indexs = [1, 2, 3];
  const colors = Object.keys(items);
  const [color, setColor] = useState(colors[0]);
  const item = items[color] || [];
  const sizes = item.map(({ size }) => size);
  const stocks = item.reduce((total, { size, stock }) => ({ ...total, [size]: stock }), {});
  const [size, setSize] = useState(sizes[0]);
  const [index, setIndex] = useState(indexs[0]);
  useEffect(() => {
    setColor(colors[0]);
  }, [items]);

  return (
    <div className='flex flex-col lg:flex-row space-y-10 lg:space-y-0 lg:space-x-10'>
      <div className='flex flex-col justify-center lg:max-w-xl'>
        <ProductImage key={id} width={800} className path={`products/${id}/${color}/${index}`} />
        <div className='flex justify-center lg:justify-start space-x-2 mt-4'>
          {indexs.map(i => (
            <div
              key={`${id}_${i}`}
              className={`rounded-xl overflow-hidden inline-flex group cursor-pointer border-[3px] w-16 sm:w-24
                 ${i === index ? 'border-teal-400' : 'border-transparent'}`}
              onClick={() => setIndex(i)}>
              <ProductImage key={`${id}_${i}`} width={100} path={`products/${id}/${color}/${i}`} />
            </div>
          ))}
        </div>
      </div>
      <div className='space-y-4 lg:space-y-6 lg:max-w-lg'>
        <h2 className='text-2xl font-semibold text-gray-900'>{name}</h2>
        <h3 className='text-xl font-medium text-gray-800  flex items-center'>
          <PriceIcon className='w-5 text-gray-500 mr-1' /> {price} Ks
        </h3>
        <p className='text-gray-600 tracking-wide py-2'>{description}</p>
        <Colors colors={colors} active={color} onSelect={setColor} />
        {sizes.length > 1 && (
          <Sizes sizes={sizes} active={size} stocks={stocks} onSelect={setSize} />
        )}
        <Button
          className='bg-teal-600 hover:bg-teal-800 focus:ring-teal-100 py-2 text-white w-full'
          onClick={() => onAdd({ id, name, color, size, price })}>
          Add to cart
        </Button>
      </div>
    </div>
  );
};

export default function Product({ cart, setCart, product, suggestions }) {
  return (
    <div>
      <HeaderSection cart={cart} setCart={setCart} />
      <Container className='py-20 lg:py-28 space-y-12 lg:space-y-20 flex flex-col'>
        <ProductOverview {...product} onAdd={newProduct => setCart([...cart, newProduct])} />
        <Suggestions products={suggestions} />
      </Container>
      <FooterSection />
    </div>
  );
}

export async function getStaticPaths() {
  const products = (await import('../../data/products.json')).default;
  const paths = products.map(({ id }) => ({ params: { id } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const { id } = params;
  const products = (await import('../../data/products.json')).default;
  const product = products.find(product => product.id === id);
  const sameGenProducts = products.filter(({ gender }) => gender === product.gender);
  const randomIds = randoms({ max: sameGenProducts.length, count: 4 });
  const suggestions = sameGenProducts
    .filter((_, i) => randomIds.includes(i))
    .map(({ id, name, price, items }) => ({ id, name, price, color: Object.keys(items)[0] }));
  return { props: { product, suggestions } };
}

function randoms({ max, count }) {
  const randomNums = [];
  for (let index = 0; index < count; index++) {
    let randomNum;
    do {
      randomNum = random(max);
    } while (randomNums.includes(randomNum));
    randomNums[index] = randomNum;
  }
  return randomNums;
}

function random(max) {
  return Math.floor(Math.random() * max);
}
