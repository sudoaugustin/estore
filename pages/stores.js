import Image from 'next/image';
import { useState } from 'react';
import stores from '../data/stores.json';
import Filter from '../components/Filter';
import HeaderSection from '../layouts/HeaderSection';
import FooterSection from '../layouts/FooterSection';
import { PhoneIcon, LocationMarkerIcon } from '@heroicons/react/solid';
import Container from '../components/Container';

const Stores = ({ cart, setCart }) => {
  const cities = ['Yangon', 'Naypyitaw', 'Mandalay'];
  const [filteredCities, setFilteredCities] = useState([]);
  const filteredStores = filteredCities.length
    ? stores.filter(store => filteredCities.some(city => store.address.includes(city)))
    : stores;

  return (
    <div>
      <HeaderSection cart={cart} setCart={setCart} />
      <Container className='py-16 lg:py-28 space-y-8'>
        <div className='flex items-center justify-between'>
          <h1 className='text-2xl font-semibold'>Stores</h1>
          <Filter
            title='City'
            items={cities}
            activeItems={filteredCities}
            onClick={setFilteredCities}
          />
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-8'>
          {filteredStores.map(({ map, name, phone, address }, i) => (
            <div
              key={i}
              className='ring-1 ring-gray-200 shadow rounded-lg overflow-hidden flex flex-row sm:flex-col md:flex-row hover:shadow-lg'>
              <div className='inline-flex'>
                <Image
                  src={`/images/stores/${i + 1}.png`}
                  width={350}
                  height={280}
                  objectFit='cover'
                />
              </div>
              <div className='p-4 bg-white w-full h-full inline-flex flex-col justify-between'>
                <div>
                  <h2 className='text-lg text-gray-900 font-medium mb-6'>{name}</h2>
                  <ul className='space-y-3'>
                    {[
                      { icon: <LocationMarkerIcon className='w-4' />, label: address },
                      { icon: <PhoneIcon className='w-4' />, label: phone },
                    ].map(({ icon, label }, i) => (
                      <li key={i} className='flex items-start text-sm -ml-0.5'>
                        <i className='text-gray-500'>{icon}</i>
                        <span className='pl-2 text-gray-600'>{label}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <a
                  href={map}
                  className='bg-teal-100 hover:bg-teal-300 text-teal-600 hover:text-teal-800 py-2 block text-center mt-6 rounded-lg duration-300'>
                  Open in map
                </a>
              </div>
            </div>
          ))}
        </div>
      </Container>
      <FooterSection />
    </div>
  );
};

export default Stores;
