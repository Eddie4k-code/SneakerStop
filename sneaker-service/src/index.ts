import express, {NextFunction, Request, Response} from 'express';
import { errorHandler, KafkaSingleton, Topics } from '@sneakerstop/shared';
import { NotFoundError} from '@sneakerstop/shared';
import cookieSession from 'cookie-session';
import mongoose from 'mongoose';
import { newSneakerRouter } from './routes/new-sneaker';
import { viewSneakerRouter } from './routes/view-sneaker';
import { allSneakersRouter } from './routes/all-sneakers';
import { updateSneakerRouter } from './routes/update-sneaker';
import { NewSneakerConsumer } from './event-test';
import { logLevel } from 'kafkajs';




export const app = express();

app.set('trust proxy', true); //ingress-nginx proxy

app.use(express.json());
app.use(
    cookieSession({
        signed: false, //JWT will be encrypted.
        secure: false,
    })
)   

app.use(newSneakerRouter);
app.use(viewSneakerRouter);
app.use(allSneakersRouter);
app.use(updateSneakerRouter);

app.all("*", async (req: Request, res: Response, next: NextFunction) => {
    next(new NotFoundError());
});

app.use(errorHandler); 


const kafkaConfig = {
    logLevel: logLevel.DEBUG,
    brokers:["kafka:29092"], //kafka running on our local kubernetes cluster
    clientId: 'sneaker-marketplace',
}

//use singleton to provide one instance of kafka :)
export const kafkaInstance = new KafkaSingleton(kafkaConfig).setupKafkaInstance();




const start = async () => {


    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET IS MISSING");
    }

    try {
        if (process.env.ENVIRONMENT! != "dev") {
            await mongoose.connect(process.env.MONGO_URI!).then(() => console.log("Auth Service Connected to MongoDB"));

            app.listen('3001', () => {
                console.log("Sneaker Service Running on Port 3001 Successfully");
            });
        }

    } catch (err) {
        console.log(err);
    }


    
}

start();
