function solution(nums) {
  const nums_length = nums.length;

  const dp = Array(nums_length + 1).fill(1);

  for (let i = 1; i < nums_length; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[i] > nums[j]) dp[i] = Math.max(dp[i], dp[j] + 1);
    }
  }

  return Math.max(...dp);
}

console.log(solution([1, 4, 2, 3, 1, 5, 7, 3])); // 5
console.log(solution([3, 2, 1])); // 1
