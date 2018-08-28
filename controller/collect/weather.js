'use strict';

import axios from 'axios'
import request from 'request'
import crypto from 'crypto'
import CityModel from '../../models/collect/city'
import WeatherModel from '../../models/collect/weather'
import dtime from 'time-formater'
import schedule from 'node-schedule'
class Weather {
    constructor() {
        this.baseUrl = "https://www.sojson.com/open/api/weather/json.shtml"
        // this.token = "5j1znBVAsnSf5xQyNQyq"
        this.cityList = {
            '安徽省':['合肥市','芜湖市','蚌埠市','淮南市','马鞍山市','淮北市','铜陵市','安庆市','黄山市','阜阳市','宿州市','滁州市','六安市','宣城市','池州市','亳州市'],
            '江苏省':['南京市','无锡市','徐州市','常州市','苏州市','南通市','连云港市','淮安市','盐城市','扬州市','镇江市','泰州市','宿迁市'],
            '上海市':['黄浦区','徐汇区','长宁区','静安区','普陀区','虹口区','杨浦区','闵行区','宝山区','嘉定区','浦东区','金山区','松江区','青浦区','奉贤区','崇明区'],
            '浙江省':['杭州市','嘉兴市','湖州市','绍兴市','宁波市','台州市','温州市','金华市','衢州市','丽水市','舟山市']
        }
        this.citySaveList = []
        var rule = new schedule.RecurrenceRule()
        rule.hour = 0
        var temp = schedule.scheduleJob(rule,()=>{
            this.startCollect()
        })
        this.startCollect()
        // this.getGeocoder()
    }
    getGeocoder(){
        for(var key in this.cityList){
            this.cityList[key].forEach(item=>{
                var temp = item
                if(key == "上海市"){
                    temp = "上海市"+item 
                }
                axios.get(encodeURI('https://restapi.amap.com/v3/geocode/geo?key=06523358ff86b422149a52ecc4d8a0bb&address='+temp)).then(res=>{
                    // console.log(res)
                    var temp2 = res.data.geocodes[0].city == "上海市"?res.data.geocodes[0].district:res.data.geocodes[0].city
                    
                    this.citySaveList.push({name:temp2,code:res.data.geocodes[0].adcode,lat:res.data.geocodes[0].location.split(',')[0],lng:res.data.geocodes[0].location.split(',')[1]})
                    // this.citySaveList.push({res.data.geocodes[0]})
                    
                    console.log(this.citySaveList)
                })
                
            })
        }
    }
    Md5(value){
		const md5 = crypto.createHash('md5');
		return md5.update(value);
	}
    async startCollect(){
        var city = await CityModel.find()
        // console.log(city)
        city.forEach((item,index)=>{
            setTimeout(()=>{this.getWeather(item)},3500*index)
        })
        
    }
    async getWeather(item){
        const res = await axios.get(encodeURI(this.baseUrl+"?city="+item.name))
        console.log(res.data)
        if(res.data.status == 200){
            var tempDate = res.data.date.substr(0,4)+'-'+res.data.date.substr(4,2)+'-'+res.data.date.substr(6,2)
            console.log(tempDate)
            var temp = {
                city:item._id,
                shidu:res.data.data.shidu,
                pm25:res.data.data.pm25  == undefined? null:res.data.data.pm25,
                pm10:res.data.data.pm10 ==undefined? null:res.data.data.pm10,
                quality:res.data.data.quality,
                wendu:res.data.data.wendu,
                ganmao:res.data.data.ganmao,
                date:dtime(tempDate).format('YYYY-MM-DD')
            }
            console.log(temp)
            const result = await WeatherModel.findOneAndUpdate({date:dtime(tempDate).format('YYYY-MM-DD'),city:item._id},temp,{upsert:true})
            // const result = await WeatherModel.create(temp)
            console.log(result)
        }
    }
    
    

}
export default Weather