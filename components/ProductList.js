import { useState } from 'react';
import Link from 'next/link';
import ProductImage from './ProductImage';

const ColorList = ({ colors, onClick }) => (
  <ul className='flex justify-center space-x-2 py-4'>
    {colors.map((color, i) => (
      <li
        key={i}
        style={{ background: color }}
        className='w-4 h-4 rounded-full border border-gray-900/25 cursor-pointer'
        onClick={() => onClick(color)}
      />
    ))}
  </ul>
);

const ProductItem = ({ id, name, price, fileIndex = 3, items, style, classes, imageWidth }) => {
  const colors = Object.keys(items);
  const [color, setColor] = useState(colors[0]);

  return (
    <div>
      <Link href={`/products/${id}`}>
        <div className='cursor-pointer group flex flex-col'>
          <ProductImage path={`products/${id}/${color}/${fileIndex}`} width={imageWidth} />
          <h3 className={`mt-4 truncate w-full ${classes.name}`}>{name}</h3>
          <p className={`mt-1 ${classes.price}`}>{price} Ks</p>
        </div>
      </Link>
      {style == 'color_swatches' && (
        <ColorList colors={colors} activeColor={color} onClick={setColor} />
      )}
    </div>
  );
};

const ProductList = ({
  title,
  style = 'color_swatches',
  products,
  gridCols,
  fileIndex,
  imageWidth = 350,
}) => {
  const classes = {
    color_swatches: {
      name: 'lg:text-lg font-medium lg:font-semibold text-gray-900 text-center',
      price: 'text-gray-800 text-center',
    },
    simple: {
      name: 'text-gray-700',
      price: 'text-lg lg:text-xl font-medium text-gray-900',
    },
  };

  return (
    <div>
      <h3 className='text-gray-900 text-xl lg:text-2xl font-semibold lg:font-bold'>{title}</h3>
      <div className={`grid gap-4 lg:gap-8 pt-8 ${gridCols}`}>
        {products.map(product => (
          <ProductItem
            key={product.id}
            style={style}
            classes={classes[style]}
            fileIndex={fileIndex}
            imageWidth={imageWidth}
            {...product}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
