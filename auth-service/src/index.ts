import express, {Request, Response} from 'express';


const app = express();

app.use(express.json());


app.listen('3000', () => {
    console.log("Auth Service Running on Port 3000 Successfully");
});