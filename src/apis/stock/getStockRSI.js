import axios from '../axios';

const getStockRSI = async (id) => {
  try {
    console.log(`/rsi?id=${id}`, 'pending');
    const response = await axios.get(`/rsi?id=${id}`);
    console.log(`/rsi?id=${id}`, 'fulfilled');
    return response.data;
  } catch (e) {
    alert(`/rsi?id=${id}`, e);
    console.log(`/rsi?id=${id}`, e);
  }
};

export default getStockRSI;
