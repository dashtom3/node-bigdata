'use strict';

import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const priceSchema = new Schema({
    name : String,
    place : String,
    price : Number,
    date : String,
})

const Price = mongoose.model('Price', priceSchema);


export default Price

