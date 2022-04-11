import axios from './axios';

const getCryptoMACD = async (Crypto) => {
  try {
    console.log(`/coin_macd?Crypto=${Crypto}`, 'pending');
    const response = await axios.get(`/coin_macd?Crypto=${Crypto}`);
    console.log(`/coin_macd?Crypto=${Crypto}`, 'fulfilled');
    return response.data;
  } catch (e) {
    alert(`/coin_macd?Crypto=${Crypto}`, e);
    console.log(`/coin_macd?Crypto=${Crypto}`, e);
  }
};

export default getCryptoMACD;
