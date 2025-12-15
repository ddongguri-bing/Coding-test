function solution(numbers, target) {
  let answer = 0;

  const dfs = (sum, idx) => {
    if (idx === numbers.length) {
      if (sum === target) answer += 1;
      return;
    }

    dfs(sum + numbers[idx], idx + 1);

    dfs(sum - numbers[idx], idx + 1);
  };

  dfs(0, 0);
  return answer;
}

console.log(solution([1, 1, 1, 1, 1], 3)); // 5
console.log(solution([4, 1, 2, 1], 4)); // 2
