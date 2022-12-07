import * as fs from "fs";
export class RockPaperScissors {
  // Arrange
  readonly guide = fs.readFileSync("../assets/day-2.txt", "utf8");
  readonly guideLines = this.guide.split("\r\n").map((line) => line.split(" "));

  // Part 1
  readonly hisShapesMap: ReadonlyMap<string, Shape> = new Map([
    ["A", Rock],
    ["B", Paper],
    ["C", Scissors],
  ]);
  readonly myShapesMap: ReadonlyMap<string, Shape> = new Map([
    ["X", Rock],
    ["Y", Paper],
    ["Z", Scissors],
  ]);
  
  // Part 2
  readonly myResultsMap: ReadonlyMap<string, ResultType> = new Map([
    ["X", ResultType.LOSE],
    ["Y", ResultType.DRAW],
    ["Z", ResultType.WIN],
  ]);

  constructor() {}

  /**
   * Part 1
   */
  matchHandler1(hisShape: Shape, myShape: Shape): number {
    let myScore = myShape.value;

    if (hisShape === myShape) {
      myScore += ResultType.DRAW;
    }
    else if (myShape.superior() === hisShape) {
      myScore += ResultType.LOSE;
    }
    else if (myShape.inferior() === hisShape) {
      myScore += ResultType.WIN;
    }

    return myScore;
  }
  
  /**
   * Part 2
   */
  matchHandler2(hisShape: Shape, neededResult: ResultType): number {
    let myShape;

    if (neededResult === ResultType.DRAW) {
      myShape = hisShape;
    } else if (neededResult === ResultType.LOSE) {
      myShape = hisShape.inferior();
    } else if (neededResult === ResultType.WIN) {
      myShape = hisShape.superior();
    }

    return neededResult + (myShape?.value || 0);
  }

  // Act
  play(part: "part1" | "part2"): void {
    let myTotalScore = 0;
    let myMap: ReadonlyMap<string, any>;
    let handler: (_: Shape, __: any) => number;

    if (part === "part1") {
      myMap = this.myShapesMap;
      handler = this.matchHandler1;
    } else if (part === "part2") {
      myMap = this.myResultsMap;
      handler = this.matchHandler2;
    }

    this.guideLines.forEach(([hisChar, myChar]) => {
      let hisShape;
      let mine;

      if (this.hisShapesMap.has(hisChar) && myMap.has(myChar)) {
          hisShape = this.hisShapesMap.get(hisChar);
          mine = myMap.get(myChar);
      } else {
          throw new Error("File decryption failed.");
      }

      myTotalScore += handler(hisShape, mine);
    });

    console.log('My total score:', myTotalScore);
  }
}

// ----- TYPES -----

export enum ShapeType {
  ROCK = 1, // score value
  PAPER = 2, 
  SCISSORS = 3
}
export enum ResultType {
  WIN = 6,
  LOSE = 0,
  DRAW = 3
}
export abstract class Shape {
  value: number;
  superior: () => Shape;
  inferior: () => Shape;
}
export class Rock extends Shape {
  static value = ShapeType.ROCK;
  static superior = () => Paper;
  static inferior = () => Scissors;
}
export class Paper extends Shape {
  static value = ShapeType.PAPER;
  static superior = () => Scissors;
  static inferior = () => Rock;
}
export class Scissors extends Shape {
  static value = ShapeType.SCISSORS;
  static superior = () => Rock;
  static inferior = () => Paper;
}


// ----- MAIN -----
new RockPaperScissors().play("part2");
