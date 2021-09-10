import Head from 'next/head';
import { useRouter } from 'next/router';

const Title = () => {
  const { asPath } = useRouter();
  const titles = {
    '/stores': 'Stores • Estore',
    '/signin': 'Sign in • Estore',
    '/signup': 'Register • Estore',
    'women/clothing': 'Clothing • Women • Estore',
    'women/accessories': 'Accessories • Women • Estore',
    'men/clothing': 'Clothing • Men • Estore',
    'men/accessories': 'Accessories • Men • Estore',
  };
  const title = Object.entries(titles).filter(([path]) => asPath.includes(path))[0];
  return (
    <Head>
      <title>{title ? title[1] : 'Estore'}</title>
      <link rel='preconnect' href='https://fonts.googleapis.com' />
      <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='true' />
      <link
        href='https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'
        rel='stylesheet'
      />
    </Head>
  );
};

export default Title;
