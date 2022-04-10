import axios from './axios';

const getStockInfo = async (number) => {
  try {
    const response = await axios.get(
      `/stock?number=${number}`,
    );
    return response.data;
  } catch (e) {
    alert(e);
    console.log(e);
  }
};

export default getStockInfo;
