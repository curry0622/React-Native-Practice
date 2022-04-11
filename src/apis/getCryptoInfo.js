import axios from './axios';

const getCryptoInfo = async (name) => {
  try {
    console.log(`/coin?name=${name}`, 'pending');
    const response = await axios.get(
      `/coin?name=${name}`,
    );
    console.log(`/coin?name=${name}`, 'fulfilled');
    return response.data;
  } catch (e) {
    alert('請輸入正確的幣種名稱');
    console.log(`/coin?name=${name}`, e);
  }
};

export default getCryptoInfo;
