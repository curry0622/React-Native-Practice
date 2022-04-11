import axios from './axios';

const getStockBOOL = async (id) => {
  try {
    const response = await axios.get(
      `/bool?id=${id}`,
    );
    return response.data;
  } catch (e) {
    alert(`/bool?id=${id}`, e);
    console.log(`/bool?id=${id}`, e);
  }
};

export default getStockBOOL;
