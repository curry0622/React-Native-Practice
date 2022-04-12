import axios from '../axios';

const signup = async ({ name, psw }) => {
  try {
    console.log(`/sign_up/${name}?user_pwd=${psw}&comfirm_pwd=${psw}`, 'pending');
    const response = await axios.get(`/sign_up/${name}?user_pwd=${psw}&comfirm_pwd=${psw}`);
    console.log(`/sign_up/${name}?user_pwd=${psw}&comfirm_pwd=${psw}`, 'fulfilled');
    return response.data;
  } catch (e) {
    alert(`/sign_up/${name}?user_pwd=${psw}&comfirm_pwd=${psw}`, e);
    console.log(`/sign_up/${name}?user_pwd=${psw}&comfirm_pwd=${psw}`, e);
  }
};

export default signup;
