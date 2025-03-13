import mongoose from "mongoose";

const conectDB = () => {
    return mongoose.connect(process.env.MONGODB_URI)
}

export default conectDB