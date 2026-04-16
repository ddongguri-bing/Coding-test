const fs = require("fs");
// const input = fs.readFileSync("2473-1.txt").toString().trim().split("\n");
const input = fs.readFileSync("2473-2.txt").toString().trim().split("\n");

const n = Number(input[0]);
const solutions = input[1]
  .split(" ")
  .map(Number)
  .sort((a, b) => a - b);

let best_sum = Infinity;
let best_sum_array = [];

for (let i = 0; i < n - 2; i++) {
  let left = i + 1;
  let right = n - 1;

  while (left < right) {
    const sum = solutions[left] + solutions[i] + solutions[right];

    const abs_sum = Math.abs(sum);

    if (abs_sum < best_sum) {
      best_sum = abs_sum;

      if (best_sum_array !== 0) best_sum_array.splice(0, 3);
      best_sum_array.push(solutions[left], solutions[i], solutions[right]);
    }

    if (sum < 0) {
      left++;
      continue;
    }
    if (sum >= 0) {
      right--;
      continue;
    }
  }
}

best_sum_array.sort((a, b) => a - b);
const answer = best_sum_array.join(" ");

console.log(answer);
