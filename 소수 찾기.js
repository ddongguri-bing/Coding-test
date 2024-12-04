// 문제 설명
// 1부터 입력받은 숫자 n 사이에 있는 소수의 개수를 반환하는 함수, solution을 만들어 보세요.

// 소수는 1과 자기 자신으로만 나누어지는 수를 의미합니다.
// (1은 소수가 아닙니다.)

// 제한 조건
// n은 2이상 1000000이하의 자연수입니다.

function solution(n) {
  let answer = 0;
  let allNums = [];

  for (let i = 0; i <= n; i++) {
    allNums.push(true);
  }

  for (let i = 2; i * i <= n; i++) {
    if (allNums[i]) {
      for (let j = i * i; j <= n; j += i) {
        allNums[j] = false;
      }
    }
  }

  allNums.splice(0, 2, false, false);

  answer = allNums.filter((num) => num !== false);

  return answer.length;
}

console.log(solution(10)); // 4
console.log(solution(5)); // 3
