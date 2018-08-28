'use strict';

import mongoose from 'mongoose';
import cityData from '../../InitData/city.js';

const Schema = mongoose.Schema;

const citySchema = new Schema({
	name: String,
	code: String,
	lat: String,
	lng: String
})

const City = mongoose.model('City', citySchema);

City.findOne((err, data) => {
	if (!data) {
        City.create(cityData)
	}
})

export default City
