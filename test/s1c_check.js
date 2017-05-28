'use strict';
let broadlink = require('../../broadlinkjs-s1c');
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
        dev.get_alarm_status();
        dev.on("alarm_status", (status) => {
                console.log("Alarm Status is " + status);
            });
        dev.get_trigger_status();
        dev.on("triggerd_status", (status) => {
                console.log("Alarm is Triggered = " + status);
            });
        setTimeout(function(){
            console.log("setting state full arm");
            dev.set_state("full_arm", false, false);
        }, 3000);
        setTimeout(function(){
            console.log("getting state");
            dev.get_alarm_status();
            dev.get_trigger_status();
        }, 8000);
        setTimeout(function(){
            console.log("setting state disarm");
            dev.set_state("disarm", false, false);
        }, 12000);
        setTimeout(function(){
            console.log("getting state");
            dev.get_alarm_status();
            dev.get_trigger_status();
        }, 15000);
    } else {
        console.log(dev.type + "@" + dev.host.address + " found... not MP1!");
        dev.exit();
    }

});

var refresh = setInterval(function(){
    b.discover();
}, 1000);
