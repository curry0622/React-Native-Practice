import axios from './axios';

const getStockPred = async (id) => {
  try {
    console.log(`/predict_stock?number=${id}`, 'pending');
    const response = await axios.get(`/predict_stock?number=${id}`);
    console.log(`/predict_stock?number=${id}`, 'fulfilled');
    return response.data;
  } catch (e) {
    console.log(`/predict_stock?number=${id}`, e);
  }
};

export default getStockPred;
