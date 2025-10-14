// 문제 설명
// n명의 사람이 일렬로 줄을 서고 있습니다.
// n명의 사람들에게는 각각 1번부터 n번까지 번호가 매겨져 있습니다. n명이 사람을 줄을 서는 방법은 여러가지 방법이 있습니다.
// 예를 들어서 3명의 사람이 있다면 다음과 같이 6개의 방법이 있습니다.

// [1, 2, 3]
// [1, 3, 2]
// [2, 1, 3]
// [2, 3, 1]
// [3, 1, 2]
// [3, 2, 1]
// 사람의 수 n과, 자연수 k가 주어질 때, 사람을 나열 하는 방법을 사전 순으로 나열 했을 때, k번째 방법을 return하는 solution 함수를 완성해주세요.

function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}

function solution(n, k) {
  const people = Array.from({ length: n }, (_, i) => i + 1);
  let answer = [];
  k--; // 인덱스 기반

  for (let i = n; i > 0; i--) {
    // 한 자리수가 고정되었을 때 나올 수 있는 모든 경우의 수
    const f = factorial(i - 1);
    // k가 속한 그룹의 인덱스를 구함
    const index = Math.floor(k / f);
    // people[index]를 answer 배열에 넣고, 해당 인덱스를 목록에서 제거
    answer.push(people[index]);
    people.splice(index, 1);
    // 사용할 k를 갱신
    k %= f;
  }

  return answer;
}

console.log(solution(3, 5)); // [3,1,2]
console.log(solution(4, 11));
