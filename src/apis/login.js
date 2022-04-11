import axios from './axios';

const login = async ({ name, pwd }) => {
  try {
    console.log(`/log_in/${name}?user_pwd=${pwd}`, 'pending');
    const response = await axios.get(`/log_in/${name}?user_pwd=${pwd}`);
    console.log(`/log_in/${name}?user_pwd=${pwd}`, 'fulfilled');
    return response.data;
  } catch (e) {
    alert(`/log_in/${name}?user_pwd=${pwd}`, e);
    console.log(`/log_in/${name}?user_pwd=${pwd}`, e);
  }
};

export default login;
