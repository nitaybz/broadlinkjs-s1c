'use strict';
let broadlink = require('../../broadlinkjs-sm');
let fs = require('fs');

var b = new broadlink();

b.discover();

b.on("deviceReady", (dev) => {
    if (dev.type == "S1C") {
        console.log("S1C check power...");
        dev.check_power();

        dev.on("power", (status_array) => {
            console.log("count is on " + status_array[0]);
            console.log("sensors is on " + status_array[1]);
        });

    } else {
        console.log(dev.type + "@" + dev.host.address + " found... not MP1!");
        dev.exit();
    }

});
