const fs = require("fs");

const data = fs
  .readFileSync("./03/data/puzzle_input.txt", { encoding: "utf8", flag: "r" })
  .toString()
  .split("\r\n");

const movementMap = {
  U: [0, 1],
  D: [0, -1],
  L: [-1, 0],
  R: [1, 0],
};

function buildPaths(nodes) {
  traversalPath = [{ x: 0, y: 0 }];
  nodes.split(",").forEach((node) => {
    let direction = node[0];
    let steps = parseInt(node.slice(1));

    for (let i = 0; i < steps; i++) {
      const { x, y } = traversalPath[traversalPath.length - 1];
      let newNode = {
        x: x + movementMap[direction][0],
        y: y + movementMap[direction][1],
      };
      traversalPath.push(newNode);
    }
  });

  return traversalPath;
}

function getIntersections(arrayOne, arrayTwo) {
  return arrayOne.filter((a) => arrayTwo.some((b) => a.x === b.x && a.y === b.y))
}

function getSteps(coords, path) {
  return path.findIndex(array => array.x === coords.x && array.y === coords.y)
}

const pathOne = buildPaths(data[0]);
const pathTwo = buildPaths(data[1]);

const intersections = getIntersections(pathOne, pathTwo)

const shortestSteps = intersections
  .map((coords) => getSteps(coords, pathOne) + getSteps(coords, pathTwo))
  .sort((a, b) => a - b)[1];

console.log(shortestSteps)