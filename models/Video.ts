
import mongoose, {Schema, models, model} from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser{
    
    email:string;
    password: string;
    _userId: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const userSchema = new Schema<IUser>(
    {
        email: {
            type: String, 
            unique: true, 
            required: true 
        },
        password: {
            type: String,
            required: true,

        }
    },
    {timestamps: true}
);