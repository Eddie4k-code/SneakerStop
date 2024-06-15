import express, {Request, Response} from 'express';
import {verifyUser} from '@sneakerstop/shared';
import mongoose from 'mongoose';

const router = express.Router();
//new order! 
router.post('/api/orders', verifyUser, async (req: Request, res:Response) => {

    const {ticketId} = req.body;

    //check that ID is valid.
    const validId = mongoose.Types.ObjectId.isValid(ticketId);



    



    
    
});


export {router as newOrderRouter}