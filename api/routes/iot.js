var express = require('express');
var router = express.Router();

const devices = [
    {
        "type": "bulb",
        "id": 41,
        "name": "Kitchen 1",
        "connectionState": "connected"
    },
    {
        "type": "outlet",
        "id": 52,
        "name": "PC Bedroom",
        "connectionState": "connected"
    },
    {
        "type": "temperatureSensor",
        "id": 11,
        "name": "sensor1",
        "connectionState": "poorConnection"
    },
    {
        "type": "bulb",
        "id": 92,
        "name": "Kitchen 2",
        "connectionState": "disconnected"
    },
    {
        "type": "bulb",
        "id": 5123,
        "name": "Bedroom 1",
        "connectionState": "poorConnection"
    },
    {
        "type": "outlet",
        "id": 101,
        "name": "Fast boi",
        "connectionState": "connected"
    },
]
let device = {
    "error": "no device found"
};

let deviceDetails = [
    {
        "type": "bulb",
        "id": 41,
        "name": "Kitchen 1",
        "connectionState": devices[0].connectionState,
        "isTurnedOn": randomBool(),
        "brightness": 100,
        "color": randomHexColor()
    },
    {
        "type": "outlet",
        "id": 52,
        "name": "PC Bedroom",
        "connectionState": "connected",
        "isTurnedOn": randomBool(),
        "powerConsumption": randomPower(),
    }, {
        "type": "temperatureSensor",
        "id": 11,
        "name": "sensor1",
        "connectionState": "poorConnection",
        "temperature": randomTemp()
    }, {
        "type": "bulb",
        "id": 92,
        "name": "Kitchen 2",
        "connectionState": devices[3].connectionState,
        "isTurnedOn": false,
        "brightness": 0,
        "color": randomHexColor()
    }, {
        "type": "bulb",
        "id": 5123,
        "name": "Beedroom 1",
        "connectionState": "poorConnection",
        "isTurnedOn": randomBool(),
        "brightness": 20,
        "color": randomHexColor()
    },
    {
        "type": "outlet",
        "id": 101,
        "name": "PC Bedroom",
        "connectionState": "connected",
        "isTurnedOn": randomBool(),
        "powerConsumption": randomPower(),
    },

]

setInterval(function () {
    devices[0].connectionState = randomState()
    deviceDetails[0]["connectionState"]= devices[3].connectionState
    deviceDetails[0]["isTurnedOn"]= randomBool()
    deviceDetails[0]["color"]= randomHexColor()
    broadcast(deviceDetails[0])
}.bind(this), 10000)

setInterval(function () {
    deviceDetails[2]["temperature"]= randomTemp()
    broadcast(deviceDetails[2])
}.bind(this), 2000)


setInterval(function () {
    deviceDetails[1]["powerConsumption"]= randomPower()
    broadcast(deviceDetails[1])
}.bind(this), 2341)

setInterval(function () {
    devices[5].connectionState = randomState()
    deviceDetails[5]["connectionState"]= devices[5].connectionState
    deviceDetails[5]["powerConsumption"]= randomPower()
    broadcast(deviceDetails[5])
}.bind(this), 100)

setInterval(function () {
    devices[3].connectionState = randomState()
    deviceDetails[3]["connectionState"]= devices[3].connectionState
    deviceDetails[3]["color"]= randomHexColor()
    broadcast(deviceDetails[3])
}.bind(this), 1000)

setInterval(function () {
    devices[4].connectionState = randomState()
    deviceDetails[4]["connectionState"]= devices[4].connectionState
    deviceDetails[4]["isTurnedOn"]= randomBool()
    deviceDetails[4]["color"]= randomHexColor()
    broadcast(deviceDetails[4])
}.bind(this), 28345)

var clients = []
router.ws('/refresh', function (ws, req) {
    clients.push(ws)
    // ws.on('close'), function close(){
    //     console.log('wdwdwadwad')
    //     // clients = []
    // }
});

function broadcast(msg) {
    clients.forEach((ws) => {
        let m = JSON.stringify(msg)
        ws.send(m)
    })
}

/* GET home page. */
router.get('/devices', function (req, res, next) {
    res.send(devices);
});

router.get('/devices/:id', function (req, res, next) {
    console.log(req.params.id)
    switch (req.params.id) {
        case '41': {
            device = deviceDetails[0]
            break;
        }
        case '52': {
            device = deviceDetails[1]
            break;
        }
        case '11': {
            device = deviceDetails[2]
            break;
        }
        case '92': {
            device = deviceDetails[3]
            break;
        }
        case '5123': {
            device = deviceDetails[4]
            break;
        }
        case '101': {
            device = deviceDetails[5]
            break;
        }
    }
    res.send(device);
});
module.exports = router;


function randomHexColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

function randomTemp() {
    return Math.floor(18 + Math.random() * 5)
}

function randomPower() {
    return Math.floor(100 + Math.random() * 100)
}

function randomBool() {
    return Math.random() < 0.5
}

function randomState() {
    const array = ['connected', 'poorConnection', 'disconnected']
    return array[Math.floor(Math.random() * array.length)];
}
