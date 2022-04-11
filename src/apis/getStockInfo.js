import axios from './axios';

const getStockInfo = async (number) => {
  try {
    console.log(`/stock?number=${number}`, 'pending');
    const response = await axios.get(
      `/stock?number=${number}`,
    );
    console.log(`/stock?number=${number}`, 'fulfilled');
    return response.data;
  } catch (e) {
    alert(`/stock?number=${number}`, e);
    console.log(`/stock?number=${number}`, e);
  }
};

export default getStockInfo;
