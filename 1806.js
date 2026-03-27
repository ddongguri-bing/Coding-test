const fs = require("fs");
const [first, second] = fs
  .readFileSync("1806.txt")
  .toString()
  .trim()
  .split("\n");

const [n, s] = first.trim().split(" ");
const input = second
  .trim()
  .split(" ")
  .map((i) => Number(i));

let shortest = Infinity;
let p1 = 0;
let sum = 0;

for (let p2 = 0; p2 < n; p2++) {
  sum += input[p2];

  while (sum >= s) {
    shortest = Math.min(shortest, p2 - p1 + 1);
    sum -= input[p1];
    p1++;
  }
}

console.log(shortest !== Infinity ? shortest : 0);
