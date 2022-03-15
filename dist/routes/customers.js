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
const express_1 = __importDefault(require("express"));
const customer_1 = require("../models/customer");
const router = express_1.default.Router();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const costumer = yield customer_1.Customer.find().sort('username');
    res.send(costumer);
}));
router.post('/new', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = (0, customer_1.validateCostumer)(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);
    let customer = new customer_1.Customer({
        username: req.body.userName,
        phone: req.body.phone,
        isGold: req.body.isGold
    });
    customer = yield customer.save();
    res.send(customer);
}));
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = (0, customer_1.validateCostumer)(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);
    const customer = yield customer_1.Customer.findByIdAndUpdate(req.params.id, {
        username: req.body.userName,
        phone: req.body.phone,
        isGold: req.body.isGold
    }, { new: true });
    if (!customer)
        return res.status(404).send(`the customer with this id ${req.params.id} is not found`);
    res.send(customer);
}));
exports.default = router;
