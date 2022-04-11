import axios from './axios';

const getCryptoPred = async (name) => {
  try {
    console.log(`/predict_coin?name=${name}`, 'pending');
    const response = await axios.get(`/predict_coin?name=${name}`);
    console.log(`/predict_coin?name=${name}`, 'fulfilled');
    return response.data;
  } catch (e) {
    console.log(`/predict_coin?name=${name}`, e);
  }
};

export default getCryptoPred;
