const asyncHandler = require("express-async-handler")

const getGoals = asyncHandler(async (req,res) => {
    res.status(200).json({message:"Get Goals"})
})

const setGoals = asyncHandler( async (req,res) => {
    if(!req.body.text) {
        res.status(400)
        throw new Error("Please enter a text")
    }
    res.status(200).json({message:"Set Goals",text:req.body.text})
})

const updateGoal = asyncHandler( async (req,res) => {
    res.status(200).json({message:`Update Goal id : ${req.params.id}`})
})

const deleteGoal = asyncHandler( async (req,res) => {
    res.status(200).json({message:`Delete Goal id : ${req.params.id}`})
})



module.exports = 
{
    getGoals,
    setGoals,
    updateGoal,
    deleteGoal
}