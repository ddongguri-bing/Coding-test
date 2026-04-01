const fs = require("fs");
const input = fs.readFileSync("2143.txt").toString().trim().split("\n");

const t = Number(input[0]);
const n = Number(input[1]);
const array1 = input[2].split(" ").map((e) => Number(e));
const m = Number(input[3]);
const array2 = input[4].split(" ").map((e) => Number(e));

// 배열 1과 배열 2의 누적합 배열 생성
const prefix1 = Array(n).fill(0);
prefix1[0] = array1[0];
for (let i = 1; i < n; i++) {
  prefix1[i] = prefix1[i - 1] + array1[i];
}

const prefix2 = Array(m).fill(0);
prefix2[0] = array2[0];
for (let i = 1; i < m; i++) {
  prefix2[i] = prefix2[i - 1] + array2[i];
}

// prefix[start]부터 prefix[end]까지의 합을 구하는 sum 함수
function sum_func(prefix, start, end) {
  if (start === 0) return prefix[end] - 0;
  return prefix[end] - prefix[start - 1];
}

// array2의 부분합을 구해서 Map 형태로 저장
const map = new Map();
for (let i = 0; i < m; i++) {
  for (let j = i; j < m; j++) {
    const sum = sum_func(prefix2, i, j);
    map.set(sum, (map.get(sum) || 0) + 1);
  }
}

let answer = 0;

for (let i = 0; i < n; i++) {
  for (let j = i; j < n; j++) {
    const sum = sum_func(prefix1, i, j);
    const target = t - sum;

    if (map.get(target)) answer += map.get(target);
  }
}

console.log(answer);
