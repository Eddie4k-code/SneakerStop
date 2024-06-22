import { verifyUser } from '@sneakerstop/shared';
import express, {NextFunction, Request, Response} from 'express';
import { OrderModel } from '../models/order';


const router = express.Router();

router.get('/api/orders', verifyUser, async (req: Request, res: Response, next: NextFunction) => {

    const orders = await OrderModel.find({userId: req.currentUser!.id}).populate('Sneaker');

    return res.status(200).json(orders);
});








export {router as allOrdersRouter}