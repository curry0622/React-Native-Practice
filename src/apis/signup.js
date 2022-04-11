import axios from './axios';

const signup = async ({ name, pwd }) => {
  try {
    const response = await axios.get(
      `/sign_up/${name}?user_pwd=${pwd}&comfirm_pwd=${pwd}`,
    );
    return response.data;
  } catch (e) {
    alert(`/sign_up/${name}?user_pwd=${pwd}&comfirm_pwd=${pwd}`, e);
    console.log(`/sign_up/${name}?user_pwd=${pwd}&comfirm_pwd=${pwd}`, e);
  }
};

export default signup;
