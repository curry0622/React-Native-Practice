import axios from './axios';

const getCryptoRSI = async (Crypto) => {
  try {
    console.log(`/coin_rsi?Crypto=${Crypto}`, 'pending');
    const response = await axios.get(`/coin_rsi?Crypto=${Crypto}`);
    console.log(`/coin_rsi?Crypto=${Crypto}`, 'fulfilled');
    return response.data;
  } catch (e) {
    alert(`/coin_rsi?Crypto=${Crypto}`, e);
    console.log(`/coin_rsi?Crypto=${Crypto}`, e);
  }
};

export default getCryptoRSI;
