import express, {NextFunction, Request, Response} from 'express'
import { checkForEmptyField } from '../utils';
import { RequestValidationError } from '../../errors/request-validation-error';
import { UserModel } from '../models/user';

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
        next(new RequestValidationError("User with that email already exists!"));
    }

    const user = UserModel.createUser({email, password});

    await user.save();



    return res.status(201).json(user);

    
});


export {router as signUpRouter};