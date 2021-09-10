const List = ({ title, list }) => (
  <div>
    <h2 className='text-teal-300 font-medium mb-8'>{title}</h2>
    <ul className='space-y-4'>
      {list.map((list, i) => (
        <li key={i} className='text-teal-500 hover:text-teal-300 cursor-pointer'>
          {list}
        </li>
      ))}
    </ul>
  </div>
);

const FooterSection = () => {
  const sections = [
    {
      title: 'Products',
      list: ['Bags', 'Pants', 'Shirts', 'Accessories'],
    },
    {
      title: 'Customer Service',
      list: ['Shipping', 'Returns', 'Warranty', 'Secure Payments', 'FAQs', 'Find a store'],
    },
    {
      title: 'Company',
      list: ['Who we are', 'Press', 'Careers', 'Terms & Conditions', 'Privacy'],
    },
    {
      title: 'Connect',
      list: ['Contact Us', 'Twitter', 'Instagram', 'Facebook'],
    },
  ];
  return (
    <footer className='p-4 lg:p-8 bg-teal-900'>
      <div className='flex justify-center'>
        <div className='inline-grid grid-cols-2 md:grid-cols-4 gap-20 py-10'>
          {sections.map((section, i) => (
            <List key={i} {...section} />
          ))}
        </div>
      </div>
      <p className='text-center text-teal-600 mt-8'>Copyright © 2021 estore Inc.</p>
    </footer>
  );
};

export default FooterSection;
