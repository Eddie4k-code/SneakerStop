import express, {Request, Response} from 'express';
import { currentUserRouter } from './routes/current-user';
import { signInRouter } from './routes/signin';
import { signOutRouter } from './routes/signout';
import { signUpRouter } from './routes/signup';
import { errorHandler } from '../middleware/handle-errors';



const app = express();

app.use(express.json());
app.use(currentUserRouter);
app.use(signInRouter);
app.use(signOutRouter);
app.use(signUpRouter);
app.use(errorHandler);



app.listen('3000', () => {
    console.log("Auth Service Running on Port 3000 Successfully");
});