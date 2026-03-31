const fs = require("fs");
const input = fs.readFileSync("10816.txt").toString().trim().split("\n");

const n = Number(input[0]);
const cards = input[1].split(" ").map((v) => Number(v));
const sorted_cards = cards.sort((a, b) => a - b);

const m = Number(input[2]);
const numbers = input[3].split(" ").map((v) => Number(v));

let answer = "";

function upperBound(cards, target) {
  let min = 0;
  let max = cards.length - 1;
  let mid = Math.floor((min + max) / 2);

  while (min <= max) {
    if (cards[mid] <= target) {
      min = mid + 1;
      mid = Math.floor((min + max) / 2);
    } else {
      max = mid - 1;
      mid = Math.floor((min + max) / 2);
    }
  }

  return min;
}

function lowerBound(cards, target) {
  let min = 0;
  let max = cards.length - 1;
  let mid = Math.floor((min + max) / 2);

  while (min <= max) {
    if (cards[mid] < target) {
      min = mid + 1;
      mid = Math.floor((min + max) / 2);
    } else {
      max = mid - 1;
      mid = Math.floor((min + max) / 2);
    }
  }

  return min;
}

for (let i = 0; i < m; i++) {
  const lower = lowerBound(sorted_cards, numbers[i]);
  const upper = upperBound(sorted_cards, numbers[i]);

  // console.log(`lower : ${lower}, upper: ${upper}`);

  if (i < m - 1) answer += `${upper - lower} `;
  else answer += upper - lower;
}

console.log(answer);
