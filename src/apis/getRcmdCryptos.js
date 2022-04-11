import axios from './axios';

const getFavStocks = async () => {
  try {
    console.log('/recommend_coin', 'pending');
    const response = await axios.get('/recommend_coin');
    console.log('/recommend_coin', 'fulfilled');
    return response.data;
  } catch (e) {
    alert('/recommend_coin', e);
    console.log('/recommend_coin', e);
  }
};

export default getFavStocks;
