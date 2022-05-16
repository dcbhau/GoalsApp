import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import goalServices from './services/goalServices';


const initialState = 
{
    goals:[],
    isLoading:false,
    isError:false,
    isSuccess:false,
    message:''
}

export const CreateGoal = createAsyncThunk('goal/add', async (goal,thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.user.token;
        return await goalServices.createGoal(goal,token);
    }
    catch(error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
}
)

export const FetchGoals = createAsyncThunk('goal/get', async (_,thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await goalServices.FetchGoals(token);
    }
    catch(error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const DeleteGoal = createAsyncThunk('goal/delete', async (id,thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.user.token;
        return await goalServices.DeleteGoal(id,token);
    }
    catch(error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
}
)

export const goalSlice = createSlice({
    name:'goal',
    initialState,
    reducers:{
        reset:(state) => state=initialState 
    },
    extraReducers:(builder) => {
        builder
        .addCase(CreateGoal.pending , (state) => {
            state.isLoading = true
        })
        .addCase(CreateGoal.fulfilled , (state,action) => {
            state.isSuccess = true
            state.isLoading = false
            state.goals.push(action.payload)
        })
        .addCase(CreateGoal.rejected , (state,action) => {
            state.isError = true
            state.isLoading = false
            state.message = action.payload
        })
        .addCase(FetchGoals.pending , (state) => {
            state.isLoading = true
        })
        .addCase(FetchGoals.fulfilled , (state,action) => {
            state.isSuccess = true
            state.isLoading = false
            state.goals = action.payload
        })
        .addCase(FetchGoals.rejected , (state,action) => {
            state.isError = true
            state.isLoading = false
            state.message = action.payload
        })
        .addCase(DeleteGoal.pending , (state) => {
            state.isLoading = true
        })
        .addCase(DeleteGoal.fulfilled , (state,action) => {
            state.isSuccess = true
            state.isLoading = false
            state.goals = state.goals.filter((goal) => goal._id !== action.payload.id)
        })
        .addCase(DeleteGoal.rejected , (state,action) => {
            state.isError = true
            state.isLoading = false
            state.message = action.payload
        })
        


    }
})
export const {reset} = goalSlice.actions;
export default goalSlice.reducer;