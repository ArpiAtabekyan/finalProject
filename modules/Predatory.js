var LiveForm = require("./LiveForm");
var random = require("./random.js");

module.exports = class Predatory extends LiveForm {
    constructor(x, y, index) {
        super(x, y, index);
        this.life = 10;
    }

    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    chooseCell(character) {
        this.getNewCoordinates();
        return super.chooseCell(character);
    } 

    move() {
        this.life--;
        let emptyCells = this.chooseCell(0);
        let newCell = random(emptyCells);

        if (newCell) {
            let x = newCell[0];
            let y = newCell[1];
            matrix[y][x] = 3;
            matrix[this.y][this.x] = 0;
            this.y = y;
            this.x = x;
        }
        if (this.life < 0) {
            this.die();
        }
    }

    eat() {
        let emptyCells = this.chooseCell(2);
        let newCell = random(emptyCells);

        if (newCell) {

            this.life++;
            let x = newCell[0];
            let y = newCell[1];

            matrix[y][x] = this.index;
            matrix[this.y][this.x] = 0;

            for (let i in grassEaterArr) {
                if (grassEaterArr[i].x == x && grassEaterArr[i].y == y) {
                    grassEaterArr.splice(i, 1)
                    break;
                }
            }
            this.x = x;
            this.y = y;

            if (this.life >= 12) {
                this.mul();
            }else {
                
            }
        }
        else {
            this.move()
        }
    }

    die() {
        matrix[this.y][this.x] = 0;

        for (let i in predatoryArr) {
            if (predatoryArr[i].x == this.x && predatoryArr[i].y == this.y) {
                predatoryArr.splice(i, 1)
            }
        }
    }

    mul() {
        let emptyCells = this.chooseCell(0);
        let newCell = random(emptyCells);

        if (newCell && this.life >= 12) {
            let x = newCell[0];
            let y = newCell[1];
            matrix[y][x] = this.index;
            let predatory = new Predatory(x, y, this.index);
            predatoryArr.push(predatory);
            this.life = 10;
        }
    }

}