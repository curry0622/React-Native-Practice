import axios from './axios';

const getFavStocks = async (name) => {
  if (name === '') return null;
  try {
    console.log(`/favorite?user=${name}`, 'pending');
    const response = await axios.get(`/favorite?user=${name}`);
    console.log(`/favorite?user=${name}`, 'fulfilled');
    return response.data;
  } catch (e) {
    alert(`/favorite?user=${name}`, e);
    console.log(`/favorite?user=${name}`, e);
  }
};

export default getFavStocks;
