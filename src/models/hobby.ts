
import mongoose  from 'mongoose';
import Joi, { date, defaults, required, string }  from "joi";
import express from 'express'
import { Customer } from '../models/customer';

const customer = Customer.schema;
// we use Embedding  to relate Documents

mongoose.connect('mongodb://127.0.0.1/costumer')
        .then(()=> console.log('connected to mongoDB.. :} '))
        .catch(err => console.error('could not connect to mongoDB...', err));

export const Hobby = mongoose.model('Hobby',new mongoose.Schema(
    {
    hobbyName : {
        type : String,
        required : true,
        minlength : 5,
        maxlength : 20
        },
   
    customer : customer,
    }
));

export function validateHobby(hobby : express.Request ) : Joi.ValidationResult<any> {
    const schema = Joi.object( {
        userName : Joi.string().min(5).max(20).required(),
        phone : Joi.number().min(11).required(),
        isGold : Joi.boolean(),

    });
    
    return schema.validate(hobby);
    
}
async function createHobby(hobbyName : string , customer : Object) {
    const hobby = new Hobby({
        hobbyName,
        customer
    });
    const result = await hobby.save();
    console.log(result);
    
}
async function listHobby() {
    const courses = await Hobby 
    .find()
    .populate('customer', 'username -_id')
    .select('courseName username');
    console.log(courses);
    
}

createHobby('sport',new Customer({username :"aliamer",
    phone: 123456789012,
    isGold: true}));
//listHobby();