import axios from './axios';

const login = async ({ name, psw }) => {
  try {
    console.log(`/log_in/${name}?user_pwd=${psw}`, 'pending');
    const response = await axios.get(`/log_in/${name}?user_pwd=${psw}`);
    console.log(`/log_in/${name}?user_pwd=${psw}`, 'fulfilled');
    return response.data;
  } catch (e) {
    alert(`/log_in/${name}?user_pwd=${psw}`, e);
    console.log(`/log_in/${name}?user_pwd=${psw}`, e);
  }
};

export default login;
