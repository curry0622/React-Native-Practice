import axios from './axios';

const delFavStock = async ({ name, stockNum }) => {
  try {
    const response = await axios.delete(`/favorite?user=${name}&number=${stockNum}`);
    return response.data;
  } catch (e) {
    alert(`/favorite?user=${name}&number=${stockNum}`, e);
    console.log(`/favorite?user=${name}&number=${stockNum}`, e);
  }
};

export default delFavStock;
