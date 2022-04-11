import axios from './axios';

const delFavStock = async ({ name, stockNum }) => {
  try {
    console.log(`/del_fav_stock?user=${name}&number=${stockNum}`, 'pending');
    const response = await axios.delete(`/favorite?user=${name}&number=${stockNum}`);
    console.log(`/del_fav_stock?user=${name}&number=${stockNum}`, 'fulfilled');
    return response.data;
  } catch (e) {
    alert(`/favorite?user=${name}&number=${stockNum}`, e);
    console.log(`/favorite?user=${name}&number=${stockNum}`, e);
  }
};

export default delFavStock;
