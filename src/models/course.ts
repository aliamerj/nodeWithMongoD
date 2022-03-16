import mongoose  from 'mongoose';
import Joi, { date, defaults }  from "joi";
import express from 'express'
import { Customer } from '../models/customer';

const customer = Customer;
// we use Reference to relate Documents

mongoose.connect('mongodb://127.0.0.1/costumer')
        .then(()=> console.log('connected to mongoDB.. :} '))
        .catch(err => console.error('could not connect to mongoDB...', err));

export const Course = mongoose.model('Course',new mongoose.Schema(
    {
    courseName  : {
        type : String,
        required : true,
        minlength : 5,
        maxlength : 20
    } , 
    dateCreate : {
        create : {type : Date , default :Date.now}
    },
    customer : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Customer'
    }
    }
));

export function validateCourse(course : express.Request ) : Joi.ValidationResult<any> {
    const schema = Joi.object( {
        userName : Joi.string().min(5).max(20).required(),
        phone : Joi.number().min(11).required(),
        isGold : Joi.boolean(),

    });
    
    return schema.validate(course);
    
}
async function createCourse(courseName : string , customer : string) {
    const course = new Course({
        courseName ,
        customer
    });
    const result = await course.save();
    console.log(result);
    
}
async function listCourses() {
    const courses = await Course 
    .find()
    .populate('customer', 'username -_id')
    .select('courseName username');
    console.log(courses);
    
}

//createCourse('node js','6230e9c4916c60b8d17a0dd4');
listCourses();