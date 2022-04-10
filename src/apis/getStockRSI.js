import axios from './axios';

const getStockRSI = async (id) => {
  try {
    const response = await axios.get(
      `/rsi?id=${id}`,
    );
    return response.data;
  } catch (e) {
    alert(e);
    console.log(e);
  }
};

export default getStockRSI;
