import express, {NextFunction, Request, Response} from 'express'
import { checkForEmptyField } from '../utils';
import { RequestValidationError } from '../../errors/request-validation-error';

const router = express.Router();
/* Sign Up Handler */
router.post("/api/users/signup", async (req: Request, res: Response, next: NextFunction) => {
    const {email, password} = req.body;

    if (!checkForEmptyField<string>(email) || !checkForEmptyField<string>(password)) {
        next(new RequestValidationError("Email and Password must be fulfilled."));
        return
    }

    return res.json("Signed Up!");

    
});


export {router as signUpRouter};