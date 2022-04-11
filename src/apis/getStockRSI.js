import axios from './axios';

const getStockRSI = async (id) => {
  try {
    const response = await axios.get(
      `/rsi?id=${id}`,
    );
    return response.data;
  } catch (e) {
    alert(`/rsi?id=${id}`, e);
    console.log(`/rsi?id=${id}`, e);
  }
};

export default getStockRSI;
