import axios from "axios";

const url = "/api/goals";

//createGoal

const createGoal = async (goal,token) => {
    const config ={
        headers:{
            Authorization:`Bearer ${token}`
        }
    }
    const response = await axios.post(url,goal,config);

    return response.data;
}

// getAll Goals

const FetchGoals = async (token) => {
    const config ={
        headers:{
            Authorization:`Bearer ${token}`
        }
    }
    const response = await axios.get(url,config);
    return response.data;
}

//Update Goal
const UpdateGoal = async (id,token) => {
    
}

//Delete Goal

const DeleteGoal = async (id,token) => {
    const config ={
        headers:{
            Authorization:`Bearer ${token}`
        }
    }
    const response = await axios.delete(url + "/" + id ,config);

    return response.data;
}

const goalServices = {
    createGoal,
    FetchGoals,
    UpdateGoal,
    DeleteGoal
}
export default goalServices;