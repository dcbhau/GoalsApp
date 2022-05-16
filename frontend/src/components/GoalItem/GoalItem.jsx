import React from 'react';
import { useDispatch } from 'react-redux';
import { DeleteGoal } from '../../features/goalSlice';
import {FaTrash,FaTrashAlt} from 'react-icons/fa'
const GoalItem = (props) => {
    const dispatch = useDispatch()

  return (
    <div className='form'>
        <div className='goal-card'>
            <p>{new Date(props.goal.createdAt).toLocaleString('en-US')}</p>
            <h5>{props.goal.text}</h5>
            <button className='btn btn-danger btn-close' onClick={() => dispatch(DeleteGoal(props.goal._id))}><FaTrashAlt/></button>
        </div>
        
    </div>
  )
}

export default GoalItem