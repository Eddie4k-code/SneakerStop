import express, {NextFunction, Request, Response} from 'express'
import { checkForEmptyField, Password } from '../utils';
import { RequestValidationError } from '../../errors/request-validation-error';
import { UserModel } from '../models/user';
import { GenericRequestError } from '../../errors/generic-request-error';
import jwt from 'jsonwebtoken';


const router = express.Router();
/* Sign Up Handler */
router.post("/api/users/signup", async (req: Request, res: Response, next: NextFunction) => {
    const {email, password} = req.body;

     /* Validate fields contained within request body */
     if (!checkForEmptyField<string>(email) || !checkForEmptyField<string>(password)) {
        next(new RequestValidationError("Email and Password must be fulfilled."));
        return
    }

    var existingUser = await UserModel.findOne({email});

    /* Validate whether use exists or not already */
    if (existingUser) {
        next(new GenericRequestError("User with that email already exists!"));
        return
    }


    const hashedPassword = await Password.passwordToHash(password);

    const user = UserModel.createUser({email, password: hashedPassword});

    await user.save();


    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET IS MISSING");
    }


    const userJWT = jwt.sign({
        id: user._id,
        email: user.email
    }, process.env.JWT_SECRET!);

    req.session = {
        jwt: userJWT
    }

    return res.status(201).json(user);

    
});


export {router as signUpRouter};