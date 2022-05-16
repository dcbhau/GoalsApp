import React, { useState } from 'react'
import {useDispatch } from 'react-redux';
import { CreateGoal } from '../../features/goalSlice';
const GoalsForm = () => {
    const dispatch = useDispatch()
    const[text,setText]= useState("");
    const addGoal = e => {
        e.preventDefault();
        dispatch(CreateGoal({text}));
        setText("")
    }
  return (
    <div className='form'>
        <form onSubmit={addGoal}>
            <div className='form-group'>
                <label>Goal</label>
                <input type="text" 
                    placeholder='Enter Your Goals' 
                    name='text' 
                    className='form-control'
                    value={text} 
                    onChange={e => setText(e.target.value)}/>
            </div>
            <button className='btn btn-dark btn-block'>Set Goal</button>
        </form>
    </div>
  )
}

export default  GoalsForm;