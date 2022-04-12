import axios from '../axios';

const getStockMACD = async (id) => {
  try {
    console.log(`/macd?id=${id}`, 'pending');
    const response = await axios.get(`/macd?id=${id}`);
    console.log(`/macd?id=${id}`, 'fulfilled');
    return response.data;
  } catch (e) {
    alert(`/macd?id=${id}`, e);
    console.log(`/macd?id=${id}`, e);
  }
};

export default getStockMACD;
