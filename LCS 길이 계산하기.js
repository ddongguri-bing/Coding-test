function solution(str1, str2) {
  // 두 문자열의 길이를 저장
  const str1_length = str1.length;
  const str2_length = str2.length;

  // LCS를 저장할 테이블 초기화
  const dp = Array.from(Array(str1_length + 1), () =>
    Array(str2_length + 1).fill(0),
  );

  // 동적 프로그래밍을 통해 LCS 계산
  for (let i = 1; i <= str1_length; i++) {
    for (let j = 1; j <= str2_length; j++) {
      if (str1[i - 1] === str2[j - 1]) dp[i][j] = dp[i - 1][j - 1] + 1;
      else dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
    }
  }

  return dp[str1_length][str2_length];
}

console.log(solution("ABCBDAB", "BDCAB")); // 4
console.log(solution("AGGTAB", "GXTXAYB")); // 4
