import axios from './axios';

const getFavStocks = async () => {
  try {
    const response = await axios.get(
      '/recommend',
    );
    return response.data;
  } catch (e) {
    alert('/recommend', e);
    console.log('/recommend', e);
  }
};

export default getFavStocks;
