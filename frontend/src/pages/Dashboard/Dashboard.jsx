import React,{useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom';
import {GoalsForm} from '../../components/GoalsForm/GoalsForm'
import { FetchGoals,reset } from '../../features/goalSlice';
import Spinner from '../../components/Spinner/Spinner';
import { toast } from 'react-toastify';
import GoalItem from '../../components/GoalItem/GoalItem';
const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {user} = useSelector(state => state.auth);
  const {goals,isError,isLoading,isSuccess,message} = useSelector(state => state.goal);

  useEffect(() => {
    if(isError){
      toast.error(message);
    }
    if(!user)
    {
      navigate("/login");
    }

    dispatch(FetchGoals());

    return () => {
      dispatch(reset());
    }
  },[user, navigate, isError, dispatch, message])

  if(isLoading) {
    return(<Spinner/>);
  }
  return (
    <>
      <div className='text-center'>
        <h1>Hello {user && user.name} !</h1>
        <p>Goals Dashboard</p>
      </div>
      <GoalsForm/>
      <div className='content'>
          {(goals.length > 0 )? (
            <>
              {goals.map((goal) => (
                <GoalItem key={goal._id} goal={goal} />
              ))}
            </>
          ) : (<h4 className='text-center mt-4'>You have not set any Goals</h4>)}
      </div>
    </>
  )
}

export default Dashboard