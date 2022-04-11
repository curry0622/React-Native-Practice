import axios from './axios';

const getStockBOOL = async (id) => {
  try {
    console.log(`/bool?id=${id}`, 'pending');
    const response = await axios.get(`/bool?id=${id}`);
    console.log(`/bool?id=${id}`, 'fulfilled');
    return response.data;
  } catch (e) {
    alert(`/bool?id=${id}`, e);
    console.log(`/bool?id=${id}`, e);
  }
};

export default getStockBOOL;
