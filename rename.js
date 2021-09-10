const fs = require('fs');
const products = require('./products.json');
const productRoot = './public/images/products';

products.map(({ id, items }) =>
  Object.keys(items).map(color => {
    fs.rename(
      `${productRoot}/${id}/${color}`,
      `${productRoot}/${id}/${color}`.replace('#', ''),
      function (err) {
        if (err) console.log('ERROR: ' + err);
      }
    );
  })
);
