import React,{useState,useEffect} from 'react';
import {FaSignInAlt} from 'react-icons/fa';
import {useDispatch,useSelector} from 'react-redux'
import {toast} from 'react-toastify';
import {useNavigate} from 'react-router-dom';
import { login,reset } from '../../features/authSlice';
import Spinner from '../../components/Spinner/Spinner';


const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {user,isLoading,isError,isSuccess,message} = useSelector((state) => (state.auth));
    const [formData,setFormData] = useState({
        email:'',
        password:'',
    })
    useEffect(() => {
        if(isError) {
            toast.error(message)
        }
        if(isSuccess || user) {
            navigate("/")
        }
        dispatch(reset())
    },[user,isError,isLoading,isSuccess,message,navigate,dispatch])
  const onChange = (e) => {
      setFormData((prevState) => ({...prevState,[e.target.name]:e.target.value}))
  }
  const submit = (e) => {
      e.preventDefault();
      const data = {
          email:formData.email,
          password:formData.password
      }
      dispatch(login(data))

  }
  if(isLoading) {
      return(<Spinner/>)
  }
  
  return (
    <>
    <div className='heading text-center'>
                <h2 className='d-flex align-items-center justify-content-center'><FaSignInAlt className='mr-2'/><span>Login </span></h2>
                <p>Login and start setting Goals</p>
            </div>
            <div>
                <form className='form' onSubmit={submit}>
                    <div className='form-group'>
                    <label>Email</label>
                    <input
                        className='form-control'
                        name="email"
                        value={formData.email}
                        onChange={onChange}
                        placeholder="Enter your email"
                        type="email"
                    />
                    </div>
                    <div className='form-group'>
                    <label>Password</label>
                    <input
                        className='form-control'  
                        name="password"
                        value={formData.password}
                        onChange={onChange}
                        placeholder="Enter password"
                        type="password"
                    />
                    </div>
                    <button className='btn btn-dark btn-block'>Login</button>
                </form>
            </div>
    </>
  )
}

export default Login