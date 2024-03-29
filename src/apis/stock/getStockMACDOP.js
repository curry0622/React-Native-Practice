import axios from '../axios';

const getStockMACDOP = async (id) => {
  try {
    console.log(`/macdop?id=${id}`, 'pending');
    const response = await axios.get(`/macdop?id=${id}`);
    console.log(`/macdop?id=${id}`, 'fulfilled');
    return response.data;
  } catch (e) {
    alert(`/macdop?id=${id}`, e);
    console.log(`/macdop?id=${id}`, e);
  }
};

export default getStockMACDOP;
