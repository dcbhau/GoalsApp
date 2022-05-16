import React, { useState, useEffect } from 'react';
import {useDispatch,useSelector} from 'react-redux'
import {FaUser} from 'react-icons/fa';
import {toast} from 'react-toastify';
import {useNavigate} from 'react-router-dom';
import { register,reset } from '../../features/authSlice';
import Spinner from '../../components/Spinner/Spinner';

const Register = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {user,isLoading,isError,isSuccess,message} = useSelector((state) => (state.auth));

    const [formData,setFormData] = useState({
        name:'',
        email:'',
        password:'',
        password2:''
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
        if(formData.password !== formData.password2)
        {
            toast.error('Password do not match');
        }
        else{
            const data = {
                name:formData.name,
                email:formData.email,
                password:formData.password,
            }
            dispatch(register(data))
        }
    }
    if(isLoading)
    {
        return(
            <Spinner/>
        )
    }
  return (
        <>
            <div className='heading text-center'>
                <h2 className='d-flex align-items-center justify-content-center'><FaUser className='mr-2'/><span>Register</span></h2>
                <p>Please Create an account</p>
            </div>
            <div>
                <form className='form' onSubmit={submit}>
                    <div className='form-group'>
                    <label>Name</label>
                    <input
                        className='form-control'
                        name="name"
                        value={formData.name}
                        onChange={onChange}
                        placeholder="Enter your name"
                        type="text"
                    />
                    </div>
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
                        value={formData.password}
                        onChange={onChange} 
                        name="password"
                        placeholder="Enter password"
                        type="password"
                    />
                    </div>
                    <div className='form-group'>
                    <label>Confirm Password</label>
                    <input
                        className='form-control'
                        name="password2"
                        value={formData.password2}
                        onChange={onChange} 
                        placeholder="Confirm password"
                        type="password"
                    />
                    </div>
                    
                    <button className='btn btn-dark btn-block'>Register</button>
                </form>
                
            </div>
        </>
  )
}

export default Register