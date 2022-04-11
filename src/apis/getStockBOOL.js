import axios from './axios';

const getStockBOOL = async (id) => {
  try {
    const response = await axios.get(
      `/bool?id=${id}`,
    );
    return response.data;
  } catch (e) {
    alert(e);
    console.log(e);
  }
};

export default getStockBOOL;
