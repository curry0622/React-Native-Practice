import axios from './axios';

const getStockInfo = async (number) => {
  try {
    const response = await axios.get(
      `/stock?number=${number}`,
    );
    return response.data;
  } catch (e) {
    alert(`/stock?number=${number}`, e);
    console.log(`/stock?number=${number}`, e);
  }
};

export default getStockInfo;
