'use strict';

import pm from './pm.js';
class Main{
    constructor(pm) {
        this.pm = pm
    }
    startCollect(){
        this.pm = new pm()
    }

}
export default new Main()