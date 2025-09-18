// 문제 설명
// 0 또는 양의 정수가 주어졌을 때, 정수를 이어 붙여 만들 수 있는 가장 큰 수를 알아내 주세요.

// 예를 들어, 주어진 정수가 [6, 10, 2]라면 [6102, 6210, 1062, 1026, 2610, 2106]를 만들 수 있고,
// 이중 가장 큰 수는 6210입니다.

// 0 또는 양의 정수가 담긴 배열 numbers가 매개변수로 주어질 때,
// 순서를 재배치하여 만들 수 있는 가장 큰 수를 문자열로 바꾸어 return 하도록 solution 함수를 작성해주세요.

function compare(x, y) {
  // 두 숫자를 문자열로 변환한 뒤 이어 붙임
  const num1 = x.toString() + y.toString();
  const num2 = y.toString() + x.toString();

  // 만약 num1이 크다면 -1을 반환하여 더 앞에 위치하도록 함
  return num1 > num2 ? -1 : 1;
}

function solution(numbers) {
  // numbers 배열을 compare 함수를 통해 정렬
  const sortedNums = numbers.sort(compare);
  // 정렬된 배열을 join 메서드를 통해 문자열로 출력
  const answer = sortedNums.join("");
  // 만약 answer의 값이 "000" 이라면 제대로 된 값이 출력되지 못하므로 숫자로 변환한 뒤 그 값이 0과 같으면 "0"을 반환
  // 0이 아니라면 구한 answer 값을 return
  return Number(answer) === 0 ? "0" : answer;
}

console.log(solution([6, 10, 2])); // 6210
console.log(solution([3, 30, 34, 5, 9])); // 95343330
