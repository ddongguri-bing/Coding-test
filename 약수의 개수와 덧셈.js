// 문제 설명
// 두 정수 left와 right가 매개변수로 주어집니다.
// left부터 right까지의 모든 수들 중에서, 약수의 개수가 짝수인 수는 더하고, 약수의 개수가 홀수인 수는 뺀 수를 return 하도록 solution 함수를 완성해주세요.

// 제한사항
// 1 ≤ left ≤ right ≤ 1,000

function solution(left, right) {
  let answer = 0;
  let numberSet = new Set();

  for (let number = left; number <= right; number++) {
    for (let i = 1; i <= Math.sqrt(number); i++) {
      if (number % i === 0) {
        numberSet.add(number / i);
        numberSet.add(i);
      }
    }
    if ([...numberSet].length % 2 === 0) answer += number;
    else answer -= number;
    numberSet = new Set();
  }
  return answer;
}

// [다른 사람의 풀이]
// 이 문제에서는 약수의 개수가 몇 개인지 중요하지 않기 때문에
// 제곱근이 정수이면 약수의 개수가 홀수라는 것을 사용해 간단하게 문제를 풀 수 있다

// function solution(left, right) {
//   var answer = 0;
//   for (let i = left; i <= right; i++) {
//       if (Number.isInteger(Math.sqrt(i))) {
//           answer -= i;
//       } else {
//           answer += i;
//       }
//   }
//   return answer;
// }

console.log(solution(13, 17)); // 43
console.log(solution(24, 27)); // 52
