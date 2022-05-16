import axios from 'axios';


const url = '/api/users';


//register user
const register = async (user) => 
{
    const response = await axios.post(url,user);
    if(response.data)
    {
        localStorage.setItem('user',JSON.stringify(response.data))
    }
    return response.data;
}

//login user
const login = async (user) => {
    const response = await axios.post(url + '/login',user);
    if(response.data)
    {
        localStorage.setItem('user',JSON.stringify(response.data))
    }
    return response.data;
}

//logout
const logout = () => {
     localStorage.removeItem('user');
}
const authService =  {
    register,
    login,
    logout
}
export default authService;