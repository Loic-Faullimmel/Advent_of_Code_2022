import * as fs from "fs";

// Arrange
const list = fs.readFileSync("../assets/day-1.txt", "utf8");
const lines = list.split("\n").map(Number);
let groupSums: number[] = [];
const sumFn = (prev, curr) => prev + curr;
const descFn = (a, b) => b - a;

// Act
lines.reduce((prev, curr) => {
  if (curr > 0) {
    return prev + curr;
  } else {
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
console.log("3 biggest sum=", groupSums.slice(0,3).reduce(sumFn));
