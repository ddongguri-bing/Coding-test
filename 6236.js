const fs = require("fs");
const params = fs.readFileSync("6236.txt").toString().trim().split("\n");

const [n, m] = params[0].split(" ").map((v) => Number(v));
const input = params.slice(1).map((v) => Number(v));

// K 범위
let min = Math.max(...input);
let max = input.reduce((acc, cur) => acc + cur, 0);

// check 함수
function check(input, k) {
  let money = 0;
  let count = 0;

  for (let i = 0; i < n; i++) {
    if (money - input[i] < 0) {
      count++;
      money = k;
    }
    money -= input[i];
  }

  return count;
}

while (min <= max) {
  let mid = Math.floor((max + min) / 2);

  if (check(input, mid) <= m) {
    max = mid - 1;
    k = Math.floor((max + min) / 2);
  } else {
    min = mid + 1;
    k = Math.floor((max + min) / 2);
  }
}

console.log(min);
