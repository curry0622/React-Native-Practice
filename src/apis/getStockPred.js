import axios from './axios';

const getStockPred = async (id) => {
  try {
    const response = await axios.get(
      `/predict_stock?number=${id}`,
    );
    return response.data;
  } catch (e) {
    alert(`/predict_stock?number=${id}`, e);
    console.log(`/predict_stock?number=${id}`, e);
  }
};

export default getStockPred;
