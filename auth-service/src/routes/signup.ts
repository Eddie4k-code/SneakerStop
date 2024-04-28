import express, {Request, Response} from 'express'
import { checkForEmptyField } from '../utils';
import { RequestValidationError } from '../../errors/request-validation-error';

const router = express.Router();


router.post("/api/users/signup", async (res: Response, req: Request) => {


    try {

        const {email, password} = req.body;

        if (!checkForEmptyField<string>(email) || !checkForEmptyField<string>(password)) {
            throw new RequestValidationError("Email and Password must be fulfilled.");
        }


    } catch(err:any) {
        console.log(err);
        return res.status(400).json({"error": err.message});
    }

});


export {router as signUpRouter};