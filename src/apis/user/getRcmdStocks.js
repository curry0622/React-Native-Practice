import axios from '../axios';

const getFavStocks = async () => {
  try {
    console.log('/recommend', 'pending');
    const response = await axios.get('/recommend');
    console.log('/recommend', 'fulfilled');
    return response.data;
  } catch (e) {
    alert('/recommend', e);
    console.log('/recommend', e);
  }
};

export default getFavStocks;
