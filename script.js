
//! Setup function fires automatically
function setup() {

    var socket = io();

    var side = 30;

    var matrix = [];

    //! Getting DOM objects (HTML elements)
    let grassCountElement = document.getElementById('grassCount');
    let grassEaterCountElement = document.getElementById('grassEaterCount');
    let predatoryCountElement = document.getElementById('predatoryCount');
    let predatoryEaterCountElement = document.getElementById('predatoryEaterCount');
    let anotherCharacterCountElement = document.getElementById('anotherCharacterCount');


    //! adding socket listener on "data" <-- name, after that fire 'drawCreatures' function 

    socket.on("data", drawCreatures);

    socket.on("weather", function (data) {
        weath = data;
    })

    function drawCreatures(data) {
        //! after getting data pass it to matrix variable
        matrix = data.matrix;
        grassCountElement.innerText = data.grassCounter;
        grassEaterCountElement.innerText = data.grassEaterCounter;
        predatoryCountElement.innerText = data.predatoryCounter;
        predatoryEaterCountElement.innerText = data.predatoryEaterCounter;
        anotherCharacterCountElement.innerText = data.anotherCharacterCounter;

        //! Every time it creates new Canvas woth new matrix size
        createCanvas(matrix[0].length * side, matrix.length * side)
        //! clearing background by setting it to new grey color
        background('#acacac');
        //! Draw grassCount and grassEaterCount to HTML (use DOM objects to update information, yes, and use .innerText <- function)

        //! Drawing and coloring RECTs
        function nkarel(matrix) {
            for (var y = 0; y < matrix.length; y++) {
                for (var x = 0; x < matrix[0].length; x++) {
                    var obj = matrix[y][x];
                    if (obj == 1) {
                        if (weath == "summer") {
                            fill("#469d89");
                        } else if (weath == "autumn") {
                            fill("#718355");
                        } else if (weath == "winter") {
                            fill("#d8f3dc");
                        } else if (weath == "spring") {
                            fill("#78c6a3");
                        }
                    } else if (obj == 2) {
                        if (weath == "summer") {
                            fill("#ffda3d");
                        } else if (weath == "autumn") {
                            fill("#dbb42c");
                        } else if (weath == "winter") {
                            fill("#ffe169");
                        } else if (weath == "spring") {
                            fill("#ffdd00");
                        }
                    } else if (obj == 0) {
                        fill("grey")
                    } else if (obj == 3) {
                        if (weath == "summer") {
                            fill("#ff0000");
                        } else if (weath == "autumn") {
                            fill("#b21e35");
                        } else if (weath == "winter") {
                            fill("#ef6351");
                        } else if (weath == "spring") {
                            fill("#f02e24");
                        }
                    } else if (obj == 4) {
                        if (weath == "summer") {
                            fill("#48cae4");
                        } else if (weath == "autumn") {
                            fill("#61a5c2");
                        } else if (weath == "winter") {
                            fill("#90e0ef");
                        } else if (weath == "spring") {
                            fill("#8ecae6");
                        }
                    } else if (obj == 5) {
                        if (weath == "summer") {
                            fill("#ffaa00");
                        } else if (weath == "autumn") {
                            fill("#f0ad56");
                        } else if (weath == "winter") {
                            fill("#fcbc5d");
                        } else if (weath == "spring") {
                            fill("#fcac5d");
                        }
                    }
                    rect(x * side, y * side, side, side);
                }
            }
        }

        socket.on('send matrix', nkarel)
    }

    function kill() {
        socket.emit("kill")
    }
    function addGrass() {
        socket.emit("add grass")
    }
    function addGrassEater() {
        socket.emit("add grassEater")
    }

}