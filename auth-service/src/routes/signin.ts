import express, {NextFunction, Request, Response} from 'express'
import { checkForEmptyField } from '../utils';
import { RequestValidationError } from '../../errors/request-validation-error';


const router = express.Router();

/* User Sign In */
router.post("/api/users/signin", async (req: Request, res: Response, next: NextFunction) => {
    const {email, password} = req.body;

     /* Validate fields contained within request body */
     if (!checkForEmptyField<string>(email) || !checkForEmptyField<string>(password)) {
        next(new RequestValidationError("Email and Password must be fulfilled."));
        return
    }

   return res.status(200).json(email);

});


export {router as signInRouter};