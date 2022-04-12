import axios from '../axios';

const addFavCrypto = async ({ name, cryptoName }) => {
  try {
    console.log(`/add_fav_stock?user=${name}&name=${cryptoName}`, 'pending');
    const response = await axios.delete(`/favorite_coin?user=${name}&name=${cryptoName}`);
    console.log(`/add_fav_stock?user=${name}&name=${cryptoName}`, 'fulfilled');
    return response.data;
  } catch (e) {
    alert(`/favorite_coin?user=${name}&name=${cryptoName}`, e);
    console.log(`/favorite_coin?user=${name}&name=${cryptoName}`, e);
  }
};

export default addFavCrypto;
