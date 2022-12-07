"use strict";
exports.__esModule = true;
var fs = require("fs");
// Arrange
var guide = fs.readFileSync("../assets/day-2.txt", "utf8");
var guideLines = guide.split("\r\n").map(function (line) { return line.split(" "); });
var hisEncryptedShapes = new Map([
    ["A", "Rock"],
    ["B", "Paper"],
    ["C", "Scissors"],
]);
var myEncryptedShapes = new Map([
    ["X", "Rock"],
    ["Y", "Paper"],
    ["Z", "Scissors"],
]);
// Round score results
function play(whatShape) {
    switch (whatShape) {
        case "Rock":
            return 1;
        case "Paper":
            return 2;
        case "Scissors":
            return 3;
    }
}
function draw() {
    return 3;
}
function win() {
    return 6;
}
function lose() {
    return 0;
}
function matchHandler(hisShape, myShape) {
    var score = 0;
    score += play(myShape);
    if (hisShape === myShape) {
        score += draw();
    }
    else {
        switch (myShape) {
            case "Rock":
                hisShape === "Scissors"
                    ? (score += win())
                    : (score += lose());
                break;
            case "Paper":
                hisShape === "Rock"
                    ? (score += win())
                    : (score += lose());
                break;
            case "Scissors":
                hisShape === "Paper"
                    ? (score += win())
                    : (score += lose());
                break;
        }
    }
    return score;
}
// Act
function main() {
    var totalScore = 0;
    guideLines.forEach(function (_a) {
        var his = _a[0], mine = _a[1];
        var hisShape;
        var myShape;
        if (hisEncryptedShapes.has(his) && myEncryptedShapes.has(mine)) {
            hisShape = hisEncryptedShapes.get(his);
            myShape = myEncryptedShapes.get(mine);
        }
        else {
            throw new Error("File decryption failed.");
        }
        totalScore += matchHandler(hisShape, myShape);
    });
    console.log('My total score:', totalScore);
}
main();
