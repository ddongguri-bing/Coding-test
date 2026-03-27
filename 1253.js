const fs = require("fs");
const [n, input] = fs.readFileSync("1253.txt").toString().trim().split("\n");
const inputArr = input.trim().split(" ");
const inputArrToNum = inputArr.map((i) => Number(i)).sort((a, b) => a - b);

let answer = 0;

for (let idx = 0; idx < n; idx++) {
  let pointer1 = 0;
  let pointer2 = n - 1;

  while (pointer1 < pointer2) {
    if (idx === pointer1) {
      pointer1++;
      continue;
    }
    if (idx === pointer2) {
      pointer2--;
      continue;
    }

    const sum = inputArrToNum[pointer1] + inputArrToNum[pointer2];

    if (inputArrToNum[idx] === sum) {
      answer++;
      break;
    } else if (inputArrToNum[idx] > sum) {
      pointer1++;
    } else {
      pointer2--;
    }
  }
}

console.log(answer);
