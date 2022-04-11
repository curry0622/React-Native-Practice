import axios from './axios';

const login = async ({ name, pwd }) => {
  try {
    const response = await axios.get(
      `/log_in/${name}?user_pwd=${pwd}`,
    );
    return response.data;
  } catch (e) {
    alert(e);
    console.log(e);
  }
};

export default login;
