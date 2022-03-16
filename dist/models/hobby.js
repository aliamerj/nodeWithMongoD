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
exports.validateHobby = exports.Hobby = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const joi_1 = __importDefault(require("joi"));
const customer_1 = require("../models/customer");
const customer = customer_1.Customer.schema;
// we use Embedding  to relate Documents
mongoose_1.default.connect('mongodb://127.0.0.1/costumer')
    .then(() => console.log('connected to mongoDB.. :} '))
    .catch(err => console.error('could not connect to mongoDB...', err));
exports.Hobby = mongoose_1.default.model('Hobby', new mongoose_1.default.Schema({
    hobbyName: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 20
    },
    customer: customer,
}));
function validateHobby(hobby) {
    const schema = joi_1.default.object({
        userName: joi_1.default.string().min(5).max(20).required(),
        phone: joi_1.default.number().min(11).required(),
        isGold: joi_1.default.boolean(),
    });
    return schema.validate(hobby);
}
exports.validateHobby = validateHobby;
function createHobby(hobbyName, customer) {
    return __awaiter(this, void 0, void 0, function* () {
        const hobby = new exports.Hobby({
            hobbyName,
            customer
        });
        const result = yield hobby.save();
        console.log(result);
    });
}
function listHobby() {
    return __awaiter(this, void 0, void 0, function* () {
        const courses = yield exports.Hobby
            .find()
            .populate('customer', 'username -_id')
            .select('courseName username');
        console.log(courses);
    });
}
createHobby('sport', new customer_1.Customer({ username: "aliamer",
    phone: 123456789012,
    isGold: true }));
//listHobby();
