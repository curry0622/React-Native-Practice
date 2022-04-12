import axios from '../axios';

const getCryptoKD = async (Crypto) => {
  try {
    console.log(`/coin_golden?Crypto=${Crypto}`, 'pending');
    const response = await axios.get(`/coin_golden?Crypto=${Crypto}`);
    console.log(`/coin_golden?Crypto=${Crypto}`, 'fulfilled');
    return response.data;
  } catch (e) {
    alert(`/coin_golden?Crypto=${Crypto}`, e);
    console.log(`/coin_golden?Crypto=${Crypto}`, e);
  }
};

export default getCryptoKD;
