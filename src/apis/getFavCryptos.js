import axios from './axios';

const getFavCryptos = async (name) => {
  try {
    const response = await axios.get(
      `/favorite_coin?user=${name}`,
    );
    return response.data;
  } catch (e) {
    alert(`/favorite_coin?user=${name}`, e);
    console.log(`/favorite_coin?user=${name}`, e);
  }
};

export default getFavCryptos;
