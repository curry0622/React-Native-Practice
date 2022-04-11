import axios from './axios';

const getStockMACD = async (id) => {
  try {
    const response = await axios.get(
      `/macd?id=${id}`,
    );
    return response.data;
  } catch (e) {
    alert(`/macd?id=${id}`, e);
    console.log(`/macd?id=${id}`, e);
  }
};

export default getStockMACD;
