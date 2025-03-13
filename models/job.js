
import mongoose from "mongoose";


const JobSchema = new mongoose.Schema({
    company : {
        type : String,
        required : [true  , 'please provide company name'],
        maxlength : 50
    },
    position : {
        type : String,
        required : [true  , 'please provide position'],
        maxlength : 100
    },
    status : {
        type : String, 
        enum : ['interview' ,'declined' , 'pending'],
        default : 'pending'
    },
    createdBy: {
        type : mongoose.Types.ObjectId,
        ref : 'User',
        required : [true , 'please provide user']
    }

  
},{timestamps : true})

const Job = mongoose.model('jobs', JobSchema)
export default Job