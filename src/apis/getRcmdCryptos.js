import axios from './axios';

const getFavStocks = async () => {
  try {
    const response = await axios.get(
      '/recommend_coin',
    );
    return response.data;
  } catch (e) {
    alert('/recommend_coin', e);
    console.log('/recommend_coin', e);
  }
};

export default getFavStocks;
