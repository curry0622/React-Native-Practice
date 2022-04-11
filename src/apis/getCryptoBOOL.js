import axios from './axios';

const getCryptoBOOL = async (Crypto) => {
  try {
    console.log(`/coin_bool?Crypto=${Crypto}`, 'pending');
    const response = await axios.get(`/coin_bool?Crypto=${Crypto}`);
    console.log(`/coin_bool?Crypto=${Crypto}`, 'fulfilled');
    return response.data;
  } catch (e) {
    alert(`/coin_bool?Crypto=${Crypto}`, e);
    console.log(`/coin_bool?Crypto=${Crypto}`, e);
  }
};

export default getCryptoBOOL;
