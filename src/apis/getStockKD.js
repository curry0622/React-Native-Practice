import axios from './axios';

const getStockKD = async (id) => {
  try {
    const response = await axios.get(
      `/golden?id=${id}`,
    );
    return response.data;
  } catch (e) {
    alert(`/golden?id=${id}`, e);
    console.log(`/golden?id=${id}`, e);
  }
};

export default getStockKD;
