import express, {NextFunction, Request, Response} from 'express';
import { errorHandler, KafkaSingleton, Topics } from '@sneakerstop/shared';
import { NotFoundError} from '@sneakerstop/shared';
import cookieSession from 'cookie-session';
import mongoose from 'mongoose';
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
const kafka = new KafkaSingleton(kafkaConfig);
export const kafkaInstance = kafka.setupKafkaInstance();





const start = async () => {


    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET IS MISSING");
    }

    try {
        if (process.env.ENVIRONMENT! != "ci") {
            await mongoose.connect(process.env.MONGO_URI!).then(() => console.log("Auth Service Connected to MongoDB"));

            app.listen('3003', () => {
                console.log("Sneaker Service Running on Port 3002 Successfully");
            });
        }

    } catch (err) {
        console.log(err);
    }


    
}

start();
