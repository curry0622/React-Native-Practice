import axios from './axios';

const signup = async ({ name, pwd }) => {
  try {
    console.log(`/sign_up/${name}?user_pwd=${pwd}&comfirm_pwd=${pwd}`, 'pending');
    const response = await axios.get(`/sign_up/${name}?user_pwd=${pwd}&comfirm_pwd=${pwd}`);
    console.log(`/sign_up/${name}?user_pwd=${pwd}&comfirm_pwd=${pwd}`, 'fulfilled');
    return response.data;
  } catch (e) {
    alert(`/sign_up/${name}?user_pwd=${pwd}&comfirm_pwd=${pwd}`, e);
    console.log(`/sign_up/${name}?user_pwd=${pwd}&comfirm_pwd=${pwd}`, e);
  }
};

export default signup;
