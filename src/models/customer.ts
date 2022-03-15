import mongoose  from 'mongoose';
import Joi  from "joi";
import express from 'express'

type customerType = {
    username : string,
    phone : number,
    isGold : boolean,
}
export const Customer = mongoose.model('customer',new mongoose.Schema(
    {
    username  : {
        type : String,
        required : true,
        minlength : 5,
        maxlength : 20
    } , 
    phone : {
        type : Number,
        required : true,
        length : 12
    },
    isGold : {
        type : Boolean,
        default : false
    },
}
));

export function validateCostumer(costumer : express.Request ) : Joi.ValidationResult<any> {
    const schema = Joi.object( {
        userName : Joi.string().min(5).max(20).required(),
        phone : Joi.number().min(11).required(),
        isGold : Joi.boolean(),

    });
    
    return schema.validate(costumer);
    
}

