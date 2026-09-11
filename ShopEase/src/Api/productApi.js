const API_URL = 'https://dummyjson.com/products?limit=0';

const formatProduct = (product) => {
  let category = 'Electronics';

  if (
    product.category?.includes('womens') ||
    product.category === 'beauty' ||
    product.category === 'skin-care' ||
    product.category === 'fragrances' ||
    product.category === 'womens-bags'
  ) {
    category = 'Women';
  } else if (
    product.category?.includes('mens')
  ) {
    category = 'Men';
  } else if (
    product.category === 'jewellery'
  ) {
    category = 'Women';
  }

  const priceInNPR = Math.round(product.price * 135);

  const oldPrice =
    product.discountPercentage > 0
      ? Math.round(
          priceInNPR /
            (1 - product.discountPercentage / 100)
        )
      : null;

  return {
    id: product.id,
    name: product.title,
    brand: product.brand || '',
    category,
    price: priceInNPR,
    oldPrice,
    discount: product.discountPercentage > 0,
    image: product.thumbnail || product.images?.[0],
    images: product.images || [],
    rating: product.rating || 0,
    reviews: Math.floor((product.rating || 0) * 100),
    description: product.description,
    stock: product.stock || 0,
    isNew: product.id > 90,
    colors: [],
    sizes:
      category === 'Women' || category === 'Men'
        ? ['S', 'M', 'L', 'XL']
        : [],
  };
};

export const getProducts = async () => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error('Failed to fetch products from API');
  }

  const data = await response.json();

  return data.products.map(formatProduct);
};

export const getProductById = async (id) => {
  const response = await fetch(
    `https://dummyjson.com/products/${id}`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch product');
  }

  const data = await response.json();

  return formatProduct(data);
};