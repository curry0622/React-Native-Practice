import axios from './axios';

const getStockMACD = async (id) => {
  try {
    const response = await axios.get(
      `/macd_draw?id=${id}`,
    );
    return response.data;
  } catch (e) {
    alert(e);
    console.log(e);
  }
};

export default getStockMACD;
