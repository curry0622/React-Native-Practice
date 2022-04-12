import axios from '../axios';

const getCryptoMACDOP = async (Crypto) => {
  try {
    console.log(`/coin_macdop?Crypto=${Crypto}`, 'pending');
    const response = await axios.get(`/coin_macdop?Crypto=${Crypto}`);
    console.log(`/coin_macdop?Crypto=${Crypto}`, 'fulfilled');
    return response.data;
  } catch (e) {
    alert(`/coin_macdop?Crypto=${Crypto}`, e);
    console.log(`/coin_macdop?Crypto=${Crypto}`, e);
  }
};

export default getCryptoMACDOP;
