import mongoose from "mongoose";
import customers from './routes/customers'
import express from 'express'

const app  = express(); 
mongoose.connect('mongodb://127.0.0.1/costumer')
        .then(()=> console.log('connected to mongoDB.. :} '))
        .catch(err => console.error('could not connect to mongoDB...', err));


app.use(express.json());
app.use('/api/customers', customers);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));