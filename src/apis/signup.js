import axios from './axios';

const signup = async ({ name, pwd }) => {
  try {
    const response = await axios.get(
      `/sign_up/${name}?user_pwd=${pwd}&comfirm_pwd=${pwd}`,
    );
    return response.data;
  } catch (e) {
    alert(e);
    console.log(e);
  }
};

export default signup;
