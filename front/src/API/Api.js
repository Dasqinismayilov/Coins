const baseUrl = 'http://localhost:3001';

// API cavablarını saxlamaq üçün obyektləri keş edirik
const cache = {
  categories: null,
  options: null,
  coins: {},
  coinDetail: {},
};

const getCategories = async () => {
  if (cache.categories) {
    console.log('Using cached categories');
    return cache.categories;
  }
  const res = await fetch(`${baseUrl}/categories`);
  const data = await res.json();
  if (res.ok) {
    cache.categories = data;
    return data;
  } else {
    throw new Error('Failed to fetch categories');
  }
};

const getOptions = async () => {
  if (cache.options) {
    console.log('Using cached options');
    return cache.options;
  }
  const res = await fetch(`${baseUrl}/options`);
  const data = await res.json();
  if (res.ok) {
    cache.options = data;
    return data;
  } else {
    throw new Error('Failed to fetch options');
  }
};

const getCoin = async (id) => {
  if (cache.coins[id]) {
    console.log(`Using cached coin data for id: ${id}`);
    return cache.coins[id];
  }
  const res = await fetch(`${baseUrl}/all/${id}`);
  const data = await res.json();
  if (res.ok) {
    cache.coins[id] = data;
    return data;
  } else {
    throw new Error('Failed to fetch coin');
  }
};

const getDetail = async (id, coinId) => {
  const cacheKey = `${id}-${coinId}`;
  if (cache.coinDetail[cacheKey]) {
    console.log(`Using cached detail for id: ${cacheKey}`);
    return cache.coinDetail[cacheKey];
  }
  const res = await fetch(`${baseUrl}/categories/${id}/${coinId}`);
  const data = await res.json();
  if (res.ok) {
    cache.coinDetail[cacheKey] = data;
    return data;
  } else {
    throw new Error('Failed to fetch coin detail');
  }
};

const getAllCoins = async () => {
  if (cache.allCoins) {
    console.log('Using cached all coins');
    return cache.allCoins;
  }
  const res = await fetch(`${baseUrl}/all`);
  const data = await res.json();
  cache.allCoins = data;
  return data;
};

const getSearch = async (categoryId, searchQuery) => {
  if (categoryId) {
    if (cache.coins[categoryId]) {
      console.log(`Using cached category data for id: ${categoryId}`);
      return cache.coins[categoryId];
    }
    const res = await fetch(`${baseUrl}/categories/${categoryId}`);
    const data = await res.json();
    if (res.ok) {
      cache.coins[categoryId] = data;
      return data;
    }
  } else {
    const res = await fetch(`${baseUrl}/search?${searchQuery}`);
    const data = await res.json();
    return data;
  }
};

const deleteCoin = async (id) => {
  try {
    const res = await fetch(`${baseUrl}/all/${id}`, { method: 'DELETE' });
    if (res.ok) {
      console.log(`Deleted coin with id: ${id}`);
      delete cache.coins[id]; // Keşdən silin
      return true;
    }
  } catch (error) {
    console.error(error);
  }
};

const putCoin = async (id, coin) => {
  try {
    const res = await fetch(`${baseUrl}/all/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(coin),
    });
    const data = await res.json();
    if (res.ok) {
      cache.coins[id] = data; // Keşi yeniləyirik
      return data;
    }
  } catch (error) {
    console.error(error);
  }
};

const postCoin = async (coin) => {
  try {
    const res = await fetch(`${baseUrl}/all`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(coin),
    });
    const data = await res.json();
    if (res.ok) {
      cache.allCoins = null;
      return data;
    }
  } catch (error) {
    console.error(error);
  }
};

const postAcces = async (acces) => {
  const res = await fetch(`${baseUrl}/acces`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(acces),
  });
  const data = await res.json();
  return data;
};

export {
  getAllCoins,
  getCategories,
  getCoin,
  getDetail,
  getSearch,
  deleteCoin,
  putCoin,
  postCoin,
  postAcces,
  getOptions,
};
