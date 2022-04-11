import axios from './axios';

const getStockHist = async (id) => {
  try {
    console.log(`/stock_inter?id=${id}`, 'pending');
    const response = await axios.get(`/stock_inter?id=${id}`);
    console.log(`/stock_inter?id=${id}`, 'fulfilled');
    return response.data;
  } catch (e) {
    alert(`/stock_inter?id=${id}`, e);
    console.log(`/stock_inter?id=${id}`, e);
  }
};

export default getStockHist;
