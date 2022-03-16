"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCourse = exports.Course = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const joi_1 = __importDefault(require("joi"));
const customer_1 = require("../models/customer");
const customer = customer_1.Customer;
// we use Reference to relate Documents
mongoose_1.default.connect('mongodb://127.0.0.1/costumer')
    .then(() => console.log('connected to mongoDB.. :} '))
    .catch(err => console.error('could not connect to mongoDB...', err));
exports.Course = mongoose_1.default.model('Course', new mongoose_1.default.Schema({
    courseName: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 20
    },
    dateCreate: {
        create: { type: Date, default: Date.now }
    },
    customer: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Customer'
    }
}));
function validateCourse(course) {
    const schema = joi_1.default.object({
        userName: joi_1.default.string().min(5).max(20).required(),
        phone: joi_1.default.number().min(11).required(),
        isGold: joi_1.default.boolean(),
    });
    return schema.validate(course);
}
exports.validateCourse = validateCourse;
function createCourse(courseName, customer) {
    return __awaiter(this, void 0, void 0, function* () {
        const course = new exports.Course({
            courseName,
            customer
        });
        const result = yield course.save();
        console.log(result);
    });
}
function listCourses() {
    return __awaiter(this, void 0, void 0, function* () {
        const courses = yield exports.Course
            .find()
            .populate('customer', 'username -_id')
            .select('courseName username');
        console.log(courses);
    });
}
//createCourse('node js','6230e9c4916c60b8d17a0dd4');
listCourses();
