import Link from 'next/link';
import Container from '../components/Container';
import ProductImage from '../components/ProductImage';

const HeroSection = () => {
  const collectionsGrid = [
    [{ id: 'AmMJESLL', className: 'md:opacity-0 lg:opacity-100' }, { id: 'pFeTK6Ch' }],
    [{ id: 'Tcczz7ev' }, { id: 'DF731lDk' }, { id: 'SvpmtThf' }],
    [{ id: 'MqzW5BxZ' }, { id: 'iiCLzQVM' }],
  ];
  return (
    <Container className='flex flex-col lg:flex-row pt-20 md:py-28 lg:py-40 relative overflow-hidden lg:overflow-visible'>
      <div className='flex flex-col justify-center items-start sm:max-w-lg md:max-w-md xl:max-w-lg'>
        <h1 className='text-4xl font font-extrabold tracking-tight text-gray-900 sm:text-6xl'>
          Summer styles are finally here
        </h1>
        <p className='mt-4 text-lg lg:text-xl text-gray-500'>
          This year, our new summer collection will shelter you from the harsh elements of a world
          that doesn't care if you live or die.
        </p>
        <Link href='/collections/all'>
          <a className='font-semibold rounded-md duration-500 mt-12 text-white bg-teal-600 hover:bg-teal-800 focus:bg-teal-900 focus:ring-4 ring-teal-200 px-6 py-3'>
            Shop Collection
          </a>
        </Link>
      </div>
      <div className='flex items-center h-[35rem] md:absolute md:-right-40 lg:right-[-6.5rem] xl:-right-10 md:top-8'>
        {collectionsGrid.map((collections, i) => (
          <div key={i} className='inline-flex flex-col'>
            {collections.map(({ id, className }) => (
              <div key={id} className={`m-4 w-44 ${className}`}>
                <ProductImage path={`collections/${id}`} width={200} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </Container>
  );
};

export default HeroSection;
