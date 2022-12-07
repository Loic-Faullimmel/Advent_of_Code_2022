import * as fs from "fs";

// Arrange
const guide = fs.readFileSync("../assets/day-2.txt", "utf8");
const guideLines = guide.split("\r\n").map((line) => line.split(" "));

type Shape = "Rock" | "Paper" | "Scissors";

const hisEncryptedShapes: ReadonlyMap<string, Shape> = new Map([
  ["A", "Rock"],
  ["B", "Paper"],
  ["C", "Scissors"],
]);
const myEncryptedShapes: ReadonlyMap<string, Shape> = new Map([
  ["X", "Rock"],
  ["Y", "Paper"],
  ["Z", "Scissors"],
]);

// Round score results
function play(whatShape: Shape): number {
  switch (whatShape) {
    case "Rock":
      return 1;
    case "Paper":
      return 2;
    case "Scissors":
      return 3;
  }
}
function draw(): number {
  return 3;
}
function win(): number {
  return 6;
}
function lose(): number {
  return 0;
}
function matchHandler(hisShape: Shape, myShape: Shape): number {
  let score = 0;

  score += play(myShape);

  if (hisShape === myShape) {
    score += draw();
  } else {
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
function main(): void {
  let totalScore = 0;

  guideLines.forEach(([his, mine]) => {
    let hisShape;
    let myShape;

    if (hisEncryptedShapes.has(his) && myEncryptedShapes.has(mine)) {
        hisShape = hisEncryptedShapes.get(his);
        myShape = myEncryptedShapes.get(mine);
    } else {
        throw new Error("File decryption failed.");
    }

    totalScore += matchHandler(hisShape, myShape);
  });

  console.log('My total score:', totalScore);
}

main();
