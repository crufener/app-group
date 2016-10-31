import * as mongoose from 'mongoose';

export interface IUser extends mongoose.Document {
    username: string,
    password: string,
    admin: boolean
}

let userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Must have a username'],
        minlength: [3, 'Your username must be 3 or more characters long']
    },
    password: {
        type: String,
        required: true
    },
    admin: {
        type: Boolean,
        default: false,
        required: true
    }
});

export default mongoose.model<IUser>('User', userSchema);
