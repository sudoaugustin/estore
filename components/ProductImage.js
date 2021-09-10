import Image from 'next/image';

const ProductImage = ({ path, width, className }) => {
  const src = `/images/${path}.jpeg`.replace('#', '');
  return (
    <Image
      src={src}
      width={width}
      height={(width * 5) / 4}
      objectFit='cover'
      className={`rounded-lg group-hover:opacity-75 duration-100 ${className}`}
      objectPosition='center'
    />
  );
};

export default ProductImage;
