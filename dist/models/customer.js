"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCostumer = exports.Customer = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const joi_1 = __importDefault(require("joi"));
exports.Customer = mongoose_1.default.model('customer', new mongoose_1.default.Schema({
    username: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 20
    },
    phone: {
        type: Number,
        required: true,
        length: 12
    },
    isGold: {
        type: Boolean,
        default: false
    },
}));
function validateCostumer(costumer) {
    const schema = joi_1.default.object({
        userName: joi_1.default.string().min(5).max(20).required(),
        phone: joi_1.default.number().min(11).required(),
        isGold: joi_1.default.boolean(),
    });
    return schema.validate(costumer);
}
exports.validateCostumer = validateCostumer;
