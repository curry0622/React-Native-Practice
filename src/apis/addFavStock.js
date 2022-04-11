import axios from './axios';

const addFavStock = async ({ name, stockNum }) => {
  try {
    console.log(`/add_fav_stock?user=${name}&number=${stockNum}`, 'pending');
    const response = await axios.post(`/favorite?user=${name}&number=${stockNum}`);
    console.log(`/add_fav_stock?user=${name}&number=${stockNum}`, 'fulfilled');
    return response.data;
  } catch (e) {
    alert(`/favorite?user=${name}&number=${stockNum}`, e);
    console.log(`/favorite?user=${name}&number=${stockNum}`, e);
  }
};

export default addFavStock;
