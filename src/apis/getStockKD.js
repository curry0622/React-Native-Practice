import axios from './axios';

const getStockKD = async (id) => {
  try {
    const response = await axios.get(
      `/golden?id=${id}`,
    );
    return response.data;
  } catch (e) {
    alert(e);
    console.log(e);
  }
};

export default getStockKD;