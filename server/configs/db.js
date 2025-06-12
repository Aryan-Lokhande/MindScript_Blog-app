import mongoose, { connect } from "mongoose";





const connectDB = async ()=> {
    try {
        mongoose.connection.on('connected', ()=>{ console.log("Database is Connected")});
        await mongoose.connect(`${process.env.MONGODB_URI}/mindscript`)
    }catch (error){
        console.log(error.message);
    }
}

export default connectDB;
