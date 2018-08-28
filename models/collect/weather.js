'use strict';

import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const weatherSchema = new Schema({
	city: { type: Schema.Types.ObjectId, ref: 'City' },
	date: String,
	shidu: String,
	pm25: Number,
	pm10: Number,
	quality: String,
	wendu: Number,
	ganmao: String,
})

const Weather = mongoose.model('Weather', weatherSchema);


export default Weather
