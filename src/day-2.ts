import * as fs from "fs";

// Arrange
const guide = fs.readFileSync("../assets/day-2.txt", "utf8");
const guideLines = guide.split("\r\n").map((line) => line.split(" "));

enum Shape {
  ROCK = 1, // score value
  PAPER = 2, 
  SCISSORS = 3
}
enum Result {
  WIN = 6,
  LOSE = 0,
  DRAW = 3
}

// Part 1
const hisShapesMap: ReadonlyMap<string, Shape> = new Map([
  ["A", Shape.ROCK],
  ["B", Shape.PAPER],
  ["C", Shape.SCISSORS],
]);
const myShapesMap: ReadonlyMap<string, Shape> = new Map([
  ["X", Shape.ROCK],
  ["Y", Shape.PAPER],
  ["Z", Shape.SCISSORS],
]);
// Part 2
const myResultsMap: ReadonlyMap<string, Result> = new Map([
  ["X", Result.LOSE],
  ["Y", Result.DRAW],
  ["Z", Result.WIN],
]);

// Part 1
function matchHandler1(hisShape: Shape, myShape: Shape): number {
  let myScore = 0;

  myScore += myShape;

  if (hisShape === myShape) {
    myScore += Result.DRAW;
  } else {
    switch (myShape) {
      case Shape.ROCK:
        hisShape === Shape.SCISSORS 
            ? (myScore += Result.WIN) 
            : (myScore += Result.LOSE);
        break;
      case Shape.PAPER:
        hisShape === Shape.ROCK 
            ? (myScore += Result.WIN) 
            : (myScore += Result.LOSE);
        break;
      case Shape.SCISSORS:
        hisShape === Shape.PAPER 
            ? (myScore += Result.WIN) 
            : (myScore += Result.LOSE);
        break;
    }
  }

  return myScore;
}
// Part 2
function matchHandler2(hisShape: Shape, neededResult: Result): number {
  let myScore = 0;
  let myShape: Shape | undefined;

  myScore += neededResult;

    switch (hisShape) {
      case Shape.ROCK:
        if (neededResult === Result.WIN)
          myShape = Shape.PAPER;
        if (neededResult === Result.LOSE)
          myShape = Shape.SCISSORS;
        if (neededResult === Result.DRAW)
          myShape = Shape.ROCK;
        break;
      case Shape.PAPER:
        if (neededResult === Result.WIN)
          myShape = Shape.SCISSORS;
        if (neededResult === Result.LOSE)
          myShape = Shape.ROCK;
        if (neededResult === Result.DRAW)
          myShape = Shape.PAPER;
        break;
      case Shape.SCISSORS:
        if (neededResult === Result.WIN)
          myShape = Shape.ROCK;
        if (neededResult === Result.LOSE)
          myShape = Shape.PAPER;
        if (neededResult === Result.DRAW)
          myShape = Shape.SCISSORS;
        break;
  }

  if (myShape)
    myScore += myShape;

  return myScore;
}

// Act
function main(hisEncryptedMap: ReadonlyMap<string, any>, myEncryptedMap: ReadonlyMap<string, any>, matchHandler: (...args) => number): void {
  let myTotalScore = 0;

  guideLines.forEach(([hisEncryptedLetter, myEncryptedLetter]) => {
    let hisShape;
    let mine;

    if (hisEncryptedMap.has(hisEncryptedLetter) && myEncryptedMap.has(myEncryptedLetter)) {
        hisShape = hisEncryptedMap.get(hisEncryptedLetter);
        mine = myEncryptedMap.get(myEncryptedLetter);
    } else {
        throw new Error("File decryption failed.");
    }

    myTotalScore += matchHandler(hisShape, mine);
  });

  console.log('My total score:', myTotalScore);
}

// Part 1
// main(hisShapesMap, myShapesMap, matchHandler1);

// Part 2
main(hisShapesMap, myResultsMap, matchHandler2);
