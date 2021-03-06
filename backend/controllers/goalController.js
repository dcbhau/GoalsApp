const asyncHandler = require("express-async-handler")
const Goal = require("../models/goalModel");
const User = require("../models/userModel");


const getGoals = asyncHandler(async (req,res) => {
    const goals = await Goal.find({user:req.user.id});

    res.status(200).json(goals)
})

const setGoals = asyncHandler( async (req,res) => {
    if(!req.body.text) {
        res.status(400)
        throw new Error("Please enter a text")
    }
    const goal = await Goal.create({
        text:req.body.text,
        user:req.user.id
    })
    res.status(200).json(goal)
})

const updateGoal = asyncHandler( async (req,res) => {
    const goal = await Goal.findById(req.params.id);
    if(!goal)
    {
        res.status(400)
        throw new Error('Goal not found')
    }

    
    if(!req.user)
    {
        res.status(401);
        throw new Error("User does not exists")
    }

    //make sure looged in user is matches the goal user
    if(req.user.id !== goal.user.toString())
    {
        res.status(401);
        throw new Error("User not Authorized")
    }
    const updateGoal = await Goal.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
    }) 
    res.status(200).json(updateGoal)
})

const deleteGoal = asyncHandler( async (req,res) => {
    const goal = await Goal.findById(req.params.id);
    if(!goal){
        res.status(400)
        throw new Error('Goal not found Delete');
    }

    //check whether user exist 

    if(!req.user)
    {
        res.status(401);
        throw new Error("User does not exists")
    }

    //make sure looged in user is matches the goal user
    if(req.user.id !== goal.user.toString())
    {
        res.status(401);
        throw new Error("User not Authorized")
    }

    await goal.remove();
    res.status(200).json({id:req.params.id})
})

module.exports = 
{
    getGoals,
    setGoals,
    updateGoal,
    deleteGoal
}