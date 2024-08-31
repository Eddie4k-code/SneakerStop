import express, {NextFunction, Request, Response} from 'express'
import { checkForEmptyField, Password } from '../utils';
import { RequestValidationError } from '@sneakerstop/shared';
import { UserModel } from '../models/user';
import { GenericRequestError } from '@sneakerstop/shared';
import jwt from 'jsonwebtoken';
import { tracer } from '..';



const router = express.Router();

/* User Sign In */
router.post("/api/users/signin", async (req: Request, res: Response, next: NextFunction) => {

    const span = tracer.startSpan("sign in", {
        attributes: {
            'http.method': 'POST',
            'http.url': req.originalUrl
        }
    })


    try {
    const {email, password} = req.body;
     /* Validate fields contained within request body */
     if (!checkForEmptyField<string>(email) || !checkForEmptyField<string>(password)) {
        span.setStatus({code: 2});
        span.addEvent('Validation Failed', {
            reason: 'Email and Password must be fulfilled'
        });
        next(new RequestValidationError("Email and Password must be fulfilled."));
        return
    }

    const existingUser = await UserModel.findOne({email});

    /* Check if user actually exists */
    if (!existingUser) {
        span.setStatus({code: 2});
        span.addEvent('User not found', {
            reason: 'Incorrect Email or Password',
        });
        next(new GenericRequestError("Incorrect Email or Password"));
        return
    }


    /* Check hashed pw */
    const validPassword = await Password.validate(existingUser.password as string, password);

    if (!validPassword) {
        span.setStatus({code: 2});
        span.addEvent('Password Validation Failed!', {
            reason: 'Incorrect Email or Password'
        });
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

} catch (err: any) {
    span.recordException(err);
    span.setStatus({code: 2, message: err.message})
} finally {
    span.end();
}

   

});


export {router as signInRouter};