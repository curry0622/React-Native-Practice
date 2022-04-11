import axios from './axios';

const getStockHist = async (id) => {
  try {
    const response = await axios.get(
      `/stock_inter?id=${id}`,
    );
    return response.data;
  } catch (e) {
    alert(`/stock_inter?id=${id}`, e);
    console.log(`/stock_inter?id=${id}`, e);
  }
};

export default getStockHist;
