import mongoose  from 'mongoose';
import express from 'express'
import { Customer, validateCostumer  } from '../models/customer';

const router = express.Router();

router.get('/',async (req , res): Promise<void> => {
    const costumer = await Customer.find().sort('username');
    res.send(costumer);
    
});
router.post('/new',async (req , res) => {
    const { error } = validateCostumer(req.body)
    if (error) return res.status(400).send(error.details[0].message);

    let customer : any = new Customer({
        username : req.body.userName,
        phone : req.body.phone,
        isGold : req.body.isGold

    });
    customer = await customer.save();
    res.send(customer);
})
 router.put('/:id',async (req , res) => {
    const { error } = validateCostumer(req.body)
    if (error) return res.status(400).send(error.details[0].message);
    const customer  = await Customer.findByIdAndUpdate(req.params.id, {
        username : req.body.userName,
        phone : req.body.phone,
        isGold : req.body.isGold
    }, {new : true});
    if (!customer) 
    return res.status(404).send(`the customer with this id ${req.params.id} is not found`);

    res.send(customer)


 });


export default router;