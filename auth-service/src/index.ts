import express, {NextFunction, Request, Response} from 'express';
import { currentUserRouter } from './routes/current-user';
import { signInRouter } from './routes/signin';
import { signOutRouter } from './routes/signout';
import { signUpRouter } from './routes/signup';
import { errorHandler } from '@sneakerstop/shared';
import { NotFoundError } from '@sneakerstop/shared';
import cookieSession from 'cookie-session';
import mongoose from 'mongoose';



export const app = express();

app.set('trust proxy', true); //ingress-nginx proxy

app.use(express.json());
app.use(
    cookieSession({
        signed: false, //JWT will be encrypted.
        secure: false,
    })
)   
app.use(signUpRouter);
app.use(signInRouter);
app.use(currentUserRouter);
app.use(signOutRouter);

app.all("*", async (req: Request, res: Response, next: NextFunction) => {
    next(new NotFoundError());
});

app.use(errorHandler); 




const start = async () => {


    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET IS MISSING");
    }

    try {
        if (process.env.ENVIRONMENT! != "dev") {
            await mongoose.connect(process.env.MONGO_URI!).then(() => console.log("Auth Service Connected to MongoDB"));

            app.listen('3000', () => {
                console.log("Auth Service Running on Port 3000 Successfully");
            });
        }

    } catch (err) {
        console.log(err);
    }

    
}

start();
