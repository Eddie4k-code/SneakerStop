import express, {Request, Response} from 'express';
import { currentUserRouter } from './routes/current-user';



const app = express();

app.use(express.json());
app.use(currentUserRouter);


app.listen('3000', () => {
    console.log("Auth Service Running on Port 3000 Successfully");
});