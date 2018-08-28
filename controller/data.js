'use strict';
import WeatherModel from '../models/collect/weather'

class Data {
	constructor(){
		
	}
	async getWeather(req, res, next){
        console.log(req.query)
        const {date} = req.query
        console.log(date)
        if (!date) {
            res.send({
                status: 0,
                type: 'FORM_DATA_ERROR',
                message: '信息错误'
            })
            return
        }
		
        try{
            const result = await WeatherModel.find({'date':date}).populate('city')
            console.log(result)
            res.send({
                status:1,
                data:result
            })
        }catch(err){
            
            res.send({
                status: 0,
                type: 'ERROR',
                message: '接口调用错误',
            })
            return
        }

    }
}

export default new Data()