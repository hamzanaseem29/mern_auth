import { Router } from "express";
import { ensureAuthenticated } from "../Middlewares/Auth.js";

const router = Router();

router.get('/', ensureAuthenticated , (req, res)=> {
    console.log('user details: --', req.user)
    res.status(200).json([
        {
            name:'Mobile',
            price: '100000'
        },
        {
            name:'Tablet',
            price:'200000'
        }
    ])
})

export default router