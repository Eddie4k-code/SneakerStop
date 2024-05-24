import express, {NextFunction, Request, Response} from 'express'
import { checkForEmptyField, Password } from '../utils';
import { RequestValidationError } from '../../errors/request-validation-error';
import { UserModel } from '../models/user';
import { GenericRequestError } from '../../errors/generic-request-error';
import jwt from 'jsonwebtoken';


const router = express.Router();

/* User Sign In */
router.post("/api/users/signin", async (req: Request, res: Response, next: NextFunction) => {
    const {email, password} = req.body;

     /* Validate fields contained within request body */
     if (!checkForEmptyField<string>(email) || !checkForEmptyField<string>(password)) {
        next(new RequestValidationError("Email and Password must be fulfilled."));
        return
    }

    const existingUser = await UserModel.findOne({email});

    /* Check if user actually exists */
    if (!existingUser) {
        next(new GenericRequestError("Incorrect Email or Password"));
        return
    }


    /* Check hashed pw */
    const validPassword = await Password.validate(existingUser.password as string, password);

    if (!validPassword) {
        next(new GenericRequestError("Incorrect Email or Password"));
        return;
    }

    /* stop app if missing jwt secret as env var */
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT SECRET IS MISSING");
    }

    const userJWT = jwt.sign({
        id: existingUser._id,
        email: existingUser.email
    }, process.env.JWT_SECRET!);

    req.session = {
        jwt: userJWT
    }

   return res.status(200).json(email);

});


export {router as signInRouter};