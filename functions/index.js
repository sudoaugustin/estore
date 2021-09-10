export const clacTotalPrice = products => products.reduce((total, { price }) => total + price, 0);

export const groupCartProducts = products =>
  products.reduce((products, product) => {
    const index = products.findIndex(
      ({ id, size, color }) => product.id === id && product.size === size && product.color === color
    );
    if (index < 0) {
      products.push({ ...product, qty: 1 });
    } else {
      products[index].qty += 1;
    }
    return products;
  }, []);
