'use strict';

import pm from './pm.js';
import weather from './weather.js'

class Main{
    constructor(pm,weather) {
        this.pm = pm
        this.weather = weather
    }
    startCollect(){
        // this.pm = new pm()
        this.weather = new weather()
    }

}
export default new Main()