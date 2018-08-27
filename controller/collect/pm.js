'use strict';

import axios from 'axios'
class PM{
    constructor() {
        this.baseUrl = "https://www.sojson.com/open/api/weather/json.shtml"
        // this.token = "5j1znBVAsnSf5xQyNQyq"
        this.startCollect()
    }
    startCollect(){
        console.log(this.baseUrl)
        axios.get(this.baseUrl+"?city=北京",'').then(res=>{
            console.log(res)
        })
    }


}
export default PM