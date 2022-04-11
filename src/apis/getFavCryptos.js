import axios from './axios';

const getFavCryptos = async (name) => {
  try {
    console.log(`/favorite_coin?user=${name}`, 'pending');
    const response = await axios.get(`/favorite_coin?user=${name}`);
    console.log(`/favorite_coin?user=${name}`, 'fulfilled');
    return response.data;
  } catch (e) {
    alert(`/favorite_coin?user=${name}`, e);
    console.log(`/favorite_coin?user=${name}`, e);
  }
};

export default getFavCryptos;
