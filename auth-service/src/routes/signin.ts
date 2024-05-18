import express, {NextFunction, Request, Response} from 'express'
import { checkForEmptyField } from '../utils';
import { RequestValidationError } from '../../errors/request-validation-error';
import { validateReq } from '../../middleware/validate-req';

const router = express.Router();

/* User Sign In */
router.post("/api/users/signin", validateReq, async (req: Request, res: Response, next: NextFunction) => {
    const {email, password} = req.body;

   return res.status(200).json(email);

});


export {router as signInRouter};