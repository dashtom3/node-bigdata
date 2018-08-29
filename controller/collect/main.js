'use strict';

import price from './Price.js';
import weather from './weather.js'

class Main{
    constructor(price, weather) {
        this.price = price
        this.weather = weather
    }
    startCollect(){
        // this.price = new price()
        // this.weather = new weather()
    }

}
export default new Main()