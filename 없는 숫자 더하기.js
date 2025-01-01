// 문제 설명
// 0부터 9까지의 숫자 중 일부가 들어있는 정수 배열 numbers가 매개변수로 주어집니다.
// numbers에서 찾을 수 없는 0부터 9까지의 숫자를 모두 찾아 더한 수를 return 하도록 solution 함수를 완성해주세요.

// 제한사항
// 1 ≤ numbers의 길이 ≤ 9
// 0 ≤ numbers의 모든 원소 ≤ 9
// numbers의 모든 원소는 서로 다릅니다.

// 주어진 숫자가 적어서 사용할 수 있는 방법
function solution(numbers) {
  const totalSum = 45;
  const numberSum = numbers.reduce((acc, cur) => acc + cur, 0);

  return totalSum - numberSum;
}

// function solution(numbers) {
//   let answer = 0;

//   for(let i = 0; i <= 9; i++) {
//       if(!numbers.includes(i)) answer += i;
//   }

//   return answer;
// }

console.log(solution([1, 2, 3, 4, 6, 7, 8, 0])); // 14
console.log(solution([5, 8, 4, 0, 6, 7, 9])); // 6
