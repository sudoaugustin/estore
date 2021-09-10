import Link from 'next/link';
import Arrow from './Arrow';
import ProductImage from './ProductImage';

const Featured = ({ products, imageWidth }) => (
  <div className='grid grid-cols-2 gap-4 md:gap-10'>
    {products.map(({ path, href, title }, i) => (
      <Link key={i} href={href}>
        <div className='cursor-pointer group'>
          <div className='overflow-y-hidden rounded-lg'>
            <ProductImage path={path} width={imageWidth || 450} />
          </div>
          <p className='mt-4 text-gray-900 font-medium'>{title}</p>
          <span className='inline-flex items-center text-sm group text-gray-600'>
            Shop now <Arrow />
          </span>
        </div>
      </Link>
    ))}
  </div>
);

export default Featured;
