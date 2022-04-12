import axios from '../axios';

const getStockKD = async (id) => {
  try {
    console.log(`/golden?id=${id}`, 'pending');
    const response = await axios.get(`/golden?id=${id}`);
    console.log(`/golden?id=${id}`, 'fulfilled');
    return response.data;
  } catch (e) {
    alert(`/golden?id=${id}`, e);
    console.log(`/golden?id=${id}`, e);
  }
};

export default getStockKD;
