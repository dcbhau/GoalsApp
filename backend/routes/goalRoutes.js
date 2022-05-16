const express = require("express");
const router = express.Router()
const {protected} = require("../middleware/authMiddleware")
const {
    getGoals,
    setGoals,
    updateGoal,
    deleteGoal
} = require("../controllers/goalController")

router.route('/').get(protected,getGoals).post(protected,setGoals)

router.route('/:id').put(protected,updateGoal).delete(protected,deleteGoal)

module.exports = router;