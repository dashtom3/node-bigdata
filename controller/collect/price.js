'use strict';
import PriceModel from '../../models/collect/price'
// import axios from 'axios'
var xlsx = require('node-xlsx');
var fs = require('fs');
var path = require('path');
class Price{
    constructor() {
        
        this.startCollect()
    }
    async startCollect(){
        const obj = xlsx.parse(path.join(__dirname,'./price.xlsx'));

        // var obj = xlsx.parse('../../models/collect/price.xlsx');
        
        console.log(obj[0]);
        var tempResult = []
        obj[0].data.forEach(item => {
            var temp = {
                name:item[0],
                place:item[1],
                price:parseFloat(item[2]),
                date:item[3]+""
            }
            tempResult.push(temp)
        })
        console.log(tempResult)
        const res = await PriceModel.create(tempResult)
        console.log(res)
        
    }


}
export default Price