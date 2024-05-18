import express, {NextFunction, Request, Response} from 'express';
import { currentUserRouter } from './routes/current-user';
import { signInRouter } from './routes/signin';
import { signOutRouter } from './routes/signout';
import { signUpRouter } from './routes/signup';
import { errorHandler } from '../middleware/handle-errors';
import { NotFoundError } from '../errors/not-found';
import cookieSession from 'cookie-session';
import mongoose from 'mongoose';



const app = express();

app.set('trust proxy', true); //ingress-nginx proxy

app.use(express.json());
app.use(
    cookieSession({
        signed: false, //JWT will be encrypted.
        secure: false,

    })
)   
app.use(signUpRouter)

app.all("*", async (req: Request, res: Response, next: NextFunction) => {
    next(new NotFoundError());
});

app.use(errorHandler); 




const start = async () => {

    try {
        await mongoose.connect("mongodb://auth-mongo-srv:27017/auth").then(() => console.log("Auth Service Connected to MongoDB"));

        app.listen('3000', () => {
            console.log("Auth Service Running on Port 3000 Successfully");
        });
    } catch (err) {
        console.log(err);
    }

    
}

start();
