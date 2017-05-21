'use strict';
let broadlink = require('../../broadlinkjs-sm');
let fs = require('fs');

var b = new broadlink();

b.discover();

b.on("deviceReady", (dev) => {
    if (dev.type == "S1C") {
        console.log("S1C check power...");
        dev.get_sensors_status();
        clearInterval(refresh);
        dev.on("sensors_status", (status_array) => {
            
            var count = status_array["count"];
            var sensors = status_array["sensors"]
            console.log("How Many Sensors? " + count);
            for (var i=0; i<count; i++){
                console.log("Sensor #"+(i+1)+" Name: " + sensors[i].name);
                console.log("Sensor #"+(i+1)+" Type: " + sensors[i].type);
                console.log("Sensor #"+(i+1)+" Status: " + sensors[i].status);
                console.log("Sensor #"+(i+1)+" Serial: " + sensors[i].serial);
            }
        });
        
    } else {
        console.log(dev.type + "@" + dev.host.address + " found... not MP1!");
        dev.exit();
    }

});

var refresh = setInterval(function(){
    b.discover();
}, 1000);
