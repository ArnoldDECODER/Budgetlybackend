import * as mongoose from 'mongoose';
import { model } from 'mongoose';

const userSchema = new mongoose.Schema({
    email: { type: String, required: true },// To add a default value this is how you can do it email: { type: String, required: true, default: 'example@gmail.com' }
    email_verified: { type: Boolean, required: true, default: false },//used to verify the code
    verification_token: { type: String, required: true },//used to create a otp code
    verification_token_time: { type: Date, required: true },//used to check if you did not take long to enter the code
    phone: { type: String, required: true },
    password: { type: String, required: true },
    reset_password_token: { type: String, required: false },
    reset_password_token_time: { type: Date, required: false },
    name : {type: String, required:true},
    type : {type: String, required:true},
    status : {type: String, required:true}, 
    created_at: { type: Date, required: true, default: new Date() },
    updated_at: { type: Date, required: true, default: new Date() },
});

export default model('users', userSchema);