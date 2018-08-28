'use strict';

import express from 'express'
import Data from '../controller/data'
const router = express.Router()

router.get('/weather/all', Data.getWeather);
// router.post('/register', Admin.register);

export default router