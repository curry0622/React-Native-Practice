import axios from './axios';

const getCryptoHist = async (Crypto) => {
  try {
    console.log(`/coin_inter?Crypto=${Crypto}`, 'pending');
    const response = await axios.get(`/coin_inter?Crypto=${Crypto}`);
    console.log(`/coin_inter?Crypto=${Crypto}`, 'fulfilled');
    return response.data;
  } catch (e) {
    alert(`/coin_inter?Crypto=${Crypto}`, e);
    console.log(`/coin_inter?Crypto=${Crypto}`, e);
  }
};

export default getCryptoHist;
