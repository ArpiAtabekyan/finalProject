var LiveForm = require("./LiveForm");
var random = require("./random.js");

module.exports = class AnotherCharacter extends LiveForm {

    constructor(x, y, index) {
        super(x, y, index);
        this.life = 6;
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
            matrix[y][x] = 5;
            matrix[this.y][this.x] = 0;
            this.y = y;
            this.x = x;
        }
        if (this.life < 0) {
            this.die();
        }
    }

    eat() {
        let emptyCells = this.chooseCell(4);
        let newCell = random(emptyCells);

        if (newCell) {

            this.life++;
            let x = newCell[0];
            let y = newCell[1];

            matrix[y][x] = this.index;
            matrix[this.y][this.x] = 0;

            for (let i in predatoryEaterArr) {
                if (predatoryEaterArr[i].x == x && predatoryEaterArr[i].y == y) {
                    predatoryEaterArr.splice(i, 1)
                    break;
                }
            }
            this.x = x;
            this.y = y;

            if (this.life >= 13) {
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

        for (let i in anotherCharacterArr) {
            if (anotherCharacterArr[i].x == this.x && anotherCharacterArr[i].y == this.y) {
                anotherCharacterArr.splice(i, 1)
            }
        }
    }

    mul() {
        let emptyCells = this.chooseCell(0);
        let newCell = random(emptyCells);

        if (newCell && this.life >= 13) {
            let x = newCell[0];
            let y = newCell[1];
            matrix[y][x] = this.index;
            let anotherCharacter = new AnotherCharacter(x, y, this.index);
            anotherCharacterArr.push(anotherCharacter);
            this.life = 10;
        }
    }

}