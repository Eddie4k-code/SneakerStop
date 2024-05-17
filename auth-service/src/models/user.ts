import mongoose from 'mongoose';


/* Model Creation for User */


//Shape of a User
interface IUser {
    email: string
    password: string
}

//Properties of a User Model
interface IUserModel extends mongoose.Model<IUser> {
    build(attrs: IUser): IUserDocument
}

//Properties of a User Document
interface IUserDocument extends mongoose.Document {
    email: string;
    password: string;
}

/* Mongo Schema for a User */
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});



/* Create a User in Mongo */
userSchema.statics.createUser = (attrs: IUser): IUserDocument => {
    return new User(attrs);
}



const User = mongoose.model<IUserDocument, IUserModel>('User', userSchema);




export {User};