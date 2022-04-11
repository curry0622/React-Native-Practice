import axios from './axios';

const getFavStocks = async (name) => {
  try {
    const response = await axios.get(
      `/favorite?user=${name}`,
    );
    return response.data;
  } catch (e) {
    alert(`/favorite?user=${name}`, e);
    console.log(`/favorite?user=${name}`, e);
  }
};

export default getFavStocks;
