import mongoose from 'mongoose';


/* Model Creation for User */


//Properties of a User
interface IUser {
    email: string
    password: string
}

//Properties of a User Model
interface IUserModel extends mongoose.Model<IUser> {
    createUser(attrs: IUser): IUserDocument
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
    return new UserModel(attrs);
}



const UserModel = mongoose.model<IUserDocument, IUserModel>('User', userSchema);



export {UserModel};