import axios from './axios';

const login = async ({ name, pwd }) => {
  try {
    const response = await axios.get(
      `/log_in/${name}?user_pwd=${pwd}`,
    );
    return response.data;
  } catch (e) {
    alert(`/log_in/${name}?user_pwd=${pwd}`, e);
    console.log(`/log_in/${name}?user_pwd=${pwd}`, e);
  }
};

export default login;
