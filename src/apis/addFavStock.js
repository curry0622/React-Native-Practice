import axios from './axios';

const addFavStock = async ({ name, stockNum }) => {
  try {
    const response = await axios.post(`/favorite?user=${name}&number=${stockNum}`);
    return response.data;
  } catch (e) {
    alert(`/favorite?user=${name}&number=${stockNum}`, e);
    console.log(`/favorite?user=${name}&number=${stockNum}`, e);
  }
};

export default addFavStock;
