const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name:
    {
        type:String,
        required:[true,"please enter user name"]
    },
    email:
    {
        type:String,
        required:[true,"please enter your email"]
    },
    password:
    {
        type:String,
        required:[true,"please enter Password"]
    }
},
{
    timestamps:true
})

module.exports = mongoose.model('User',userSchema);
