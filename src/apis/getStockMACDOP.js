import axios from './axios';

const getStockMACDOP = async (id) => {
  try {
    const response = await axios.get(
      `/macdop?id=${id}`,
    );
    return response.data;
  } catch (e) {
    alert(`/macdop?id=${id}`, e);
    console.log(`/macdop?id=${id}`, e);
  }
};

export default getStockMACDOP;
