//! SERVER STUFF  --  START
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
app.use(express.static("."));
var fs = require("fs");
app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);
//! SERVER STUFF END  --  END



//! Requiring modules  --  START
var Grass = require("./modules/Grass.js");
var GrassEater = require("./modules/GrassEater.js");
var Predatory = require("./modules/Predatory.js");
var PredatoryEater = require("./modules/PreadatoryEater.js");
var AnotherCharacter = require("./modules/AnotherCharacter.js");
let random = require('./modules/random');
//! Requiring modules  --  END


//! Setting global arrays  --  START
grassArr = [];
grassEaterArr = [];
predatoryArr = [];
predatoryEaterArr = [];
anotherCharacterArr = [];

matrix = [];
//! Setting global arrays  -- END


weath = "winter";
var n = 20;


//! Creating MATRIX -- START
function rand(min, max) {
    return Math.random() * (max - min) + min;
}

for (let i = 0; i < n; i++) {
    matrix[i] = [];
    for (let j = 0; j < n; j++) {
        matrix[i][j] = Math.floor(rand(0, 6))
        
    }  
}

io.sockets.emit("send matrix", matrix)
//! Creating MATRIX -- END

function kill() {
    console.log("Hello");
    grassArr = [];
    grassEaterArr = [];
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            matrix[y][x] = 0;
        }
    }
    io.sockets.emit("send matrix", matrix);
}


function addGrass() {
    for (var i = 0; i < 7; i++) {
    var x = Math.floor(Math.random() * matrix[0].length)
    var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 1
            var gr = new Grass(x, y, 1)
            grassArr.push(gr)
        }
    }
    io.sockets.emit("send matrix", matrix);
}
function addGrassEater() {
    for (var i = 0; i < 7; i++) {   
    var x = Math.floor(Math.random() * matrix[0].length)
    var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 2
            grassEaterArr.push(new GrassEater(x, y, 2))
        }
    }
    io.sockets.emit("send matrix", matrix);
}

function creatingObjects() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 2) {
                matrix[y][x] = 2
                var grassEater = new GrassEater(x, y, 2);
                grassEaterArr.push(grassEater);
            } else if (matrix[y][x] == 1) {
                matrix[y][x] = 1;
                var grass = new Grass(x, y,1);
                grassArr.push(grass);
            } else if (matrix[y][x] == 3) {
                matrix[y][x] = 3
                var predatory = new Predatory(x, y, 3);
                predatoryArr.push(predatory);
            } else if (matrix[y][x] == 4) {
                matrix[y][x] = 4
                var predatoryEater = new PredatoryEater(x, y, 4);
                predatoryEaterArr.push(predatoryEater);
            } else if (matrix[y][x] == 5) {
                matrix[y][x] = 5
                var anotherCharacter = new AnotherCharacter(x, y, 5);
                anotherCharacterArr.push(anotherCharacter);
            }
        }
    }
    io.sockets.emit('send matrix', matrix)
}


function game() {
    if (grassArr[0] !== undefined) {
        for (var i in grassArr) {
            grassArr[i].mul();
        }
    }
    if (grassEaterArr[0] !== undefined) {
        for (var i in grassEaterArr) {
            grassEaterArr[i].eat();
        }
    }
    if (predatoryArr[0] !== undefined) {
        for (var i in predatoryArr) {
            predatoryArr[i].eat();
        }
    }
    if (predatoryEaterArr[0] !== undefined) {
        for (var i in predatoryEaterArr) {
            predatoryEaterArr[i].eat();
        }
    }
    if (anotherCharacterArr[0] !== undefined) {
        for (var i in anotherCharacterArr) {
            anotherCharacterArr[i].eat();
        }
    }
    

    //! Object to send
    let sendData = {
        matrix: matrix,
        grassCounter: grassArr.length,
        grassEaterCounter: grassEaterArr.length,
        predatoryCounter: predatoryArr.length,
        predatoryEaterCounter: predatoryEaterArr.length,
        anotherCharacterCounter: anotherCharacterArr.length,
    }

    //! Send data over the socket to clients who listens "data"
    io.sockets.emit("data", sendData);

    io.sockets.emit("send matrix", matrix);

}



setInterval(game, 1000)




function weather() {
    if (weath == "winter") {
        weath = "spring"
    }
    else if (weath == "spring") {
        weath = "summer"
    }
    else if (weath == "summer") {
        weath = "autumn"
    }
    else if (weath == "autumn") {
        weath = "winter"
    }
    io.sockets.emit('weather', weath)
}
setInterval(weather, 5000);

io.on('connection', function (socket) {
    creatingObjects();
    socket.on("kill", kill);
    socket.on("add grass", addGrass);
    socket.on("add grassEater", addGrassEater);
});