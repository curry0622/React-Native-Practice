import axios from './axios';

const getStockPred = async (id) => {
  try {
    const response = await axios.get(
      `/predict_stock?number=${id}`,
    );
    return response.data;
  } catch (e) {
    alert(e);
    console.log(e);
  }
};

export default getStockPred;
