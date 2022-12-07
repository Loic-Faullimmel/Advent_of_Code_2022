"use strict";
exports.__esModule = true;
var fs = require("fs");
// Arrange
var list = fs.readFileSync("../assets/day-1.txt", "utf8");
var lines = list.split("\n").map(Number);
var groupSums = [];
var sumFn = function (prev, curr) { return prev + curr; };
var descFn = function (a, b) { return b - a; };
// Act
lines.reduce(function (prev, curr) {
    if (curr > 0) {
        return prev + curr;
    }
    else {
        groupSums.push(prev);
        return 0;
    }
}, 0);
groupSums.sort(descFn);
// Prompt
console.log("total sum=", groupSums.reduce(sumFn));
console.log("1st biggest sum=", groupSums[0]);
console.log("2nd biggest sum=", groupSums[1]);
console.log("3rd biggest sum=", groupSums[2]);
console.log("3 biggest sum=", groupSums.slice(0, 3).reduce(sumFn));
