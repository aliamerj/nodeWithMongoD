"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const customers_1 = __importDefault(require("./routes/customers"));
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
mongoose_1.default.connect('mongodb://127.0.0.1/costumer')
    .then(() => console.log('connected to mongoDB.. :} '))
    .catch(err => console.error('could not connect to mongoDB...', err));
app.use(express_1.default.json());
app.use('/api/customers', customers_1.default);
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
