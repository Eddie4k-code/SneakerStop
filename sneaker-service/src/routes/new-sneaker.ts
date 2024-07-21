import { verifyUser, RequestValidationError, Topics, CustomError } from '@sneakerstop/shared';
import express, {NextFunction, Request, Response} from 'express';
import { ISneakerDocument, SneakerModel } from '../../models/sneaker';
import { kafkaInstance } from '..';
import { Producer } from '../events/producers/new-sneaker-producer';
import { ISneakerRepository } from '../repository/ISneakerRepository';
import { MongoSneakerRepository } from '../repository/SneakerRepository';
import { ISneakerService } from '../service/ISneakerService';
import { SneakerService } from '../service/SneakerService';

const router = express.Router();


//inject sneaker repository into service through constructor
const sneakerService: ISneakerService<ISneakerDocument> = new SneakerService(new MongoSneakerRepository());

/**
 * @swagger
 * /api/sneakers:
 *   post:
 *     summary: Create a new sneaker
 *     description: This endpoint allows authenticated users to create a new sneaker.
 *     tags:
 *       - Sneakers
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the sneaker
 *                 example: Air Jordan
 *               price:
 *                 type: number
 *                 description: The price of the sneaker
 *                 example: 100
 *               size:
 *                 type: number
 *                 description: The size of the sneaker
 *                 example: 10
 *               version:
 *                 type: string
 *                 description: The version of the sneaker
 *                 example: "1.0"
 *     responses:
 *       201:
 *         description: Successfully created a new sneaker
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The ID of the newly created sneaker
 *                 title:
 *                   type: string
 *                   description: The title of the sneaker
 *                 price:
 *                   type: number
 *                   description: The price of the sneaker
 *                 size:
 *                   type: number
 *                   description: The size of the sneaker
 *                 version:
 *                   type: string
 *                   description: The version of the sneaker
 *                 userId:
 *                   type: string
 *                   description: The ID of the user who created the sneaker
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.post('/api/sneakers', verifyUser, async (req: Request, res: Response, next: NextFunction) => {

    try {

        const {title, price, size, version} = req.body;

        const sneaker = await sneakerService.newSneaker({title, price, size, version, userId: req.currentUser!.id});
    
        return res.status(201).send(sneaker);

    } catch(err: any) {

        next(err)

    }
    
});

export { router as newSneakerRouter };

