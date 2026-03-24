function solution(n, stations, w) {
  let answer = 0;
  let location = 1;
  let idx = 0;

  while (location <= n) {
    if (idx < stations.length && location >= stations[idx] - w) {
      location = stations[idx] + w + 1;
      idx += 1;
    } else {
      location += 2 * w + 1;
      answer += 1;
    }
  }

  return answer;
}

console.log(solution(11, [4, 11], 1)); // 3
console.log(solution(16, [9], 2)); // 3
