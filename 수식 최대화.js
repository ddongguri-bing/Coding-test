// 해당 문제에서 사용 가능한 연산자
const availableOperator = ["+", "-", "*"];
/**
 * 순열을 구하는 함수
 * @param {array} arr
 * @returns {array} 모든 순열 조합이 배열로 감싸진 형태
 */
const getPermutations = (arr) => {
  if (arr.length === 1) return [arr];

  const result = [];

  arr.forEach((fixed, index) => {
    const rest = arr.filter((_, i) => i !== index);
    const perms = getPermutations(rest);
    const attached = perms.map((p) => [fixed, ...p]);
    result.push(...attached);
  });

  return result;
};
// 해당 문제에서 사용 가능한 연산자로 순열 구하기
const allPermutations = getPermutations(availableOperator);

/**
 * 연산에 따른 결과값을 반환하는 함수
 * @param {number} x
 * @param {number} y
 * @param {string} op - 연산자(해당 문제에서는 +, -, * 중 하나)
 * @returns {number}
 */
const calc = (x, y, op) => {
  if (op === "+") return x + y;
  if (op === "-") return x - y;
  if (op === "*") return x * y;
};

function solution(expression) {
  // 정규 표현식을 사용하여 숫자와 연산자 분리
  const operators = expression.split(/[0-9]+/).filter(Boolean); // truthy한 값만을 반환하도록 하여 빈문자열이 오지 않도록 함
  const nums = expression.split(/[+\-*]/).map(Number); // split한 후 반환된 문자열 숫자를 숫자로 변환

  // 우선순위에 따른 수식 계산
  let max = 0;

  // 순열을 하나씩 순환
  for (let permutation of allPermutations) {
    // 원본 배열이 변경되는 것을 막기 위해 operators와 nums 배열을 복사
    let ops = [...operators];
    let n = [...nums];

    // 순열에 담긴 우선순위대로 연산자를 추출
    for (let op of permutation) {
      // expressions에 사용된 모든 연산자를 사용할 때까지 반복
      while (ops.includes(op)) {
        // operator의 idx를 찾아서 한 칸 옆 숫자와 계산
        const idx = ops.indexOf(op);
        const result = calc(n[idx], n[idx + 1], op);

        // 계산이 끝나면 사용한 연산자는 잘라서 없애기
        ops.splice(idx, 1);
        // 계산이 끝나면 사용한 숫자는 잘라서 없앤 후 result 값을 넣기
        n.splice(idx, 2, result);
      }
    }

    // 최종적으로 배열에 남은 값(계산된 값)의 절대값과 기존 max 변수에 들어있던 값 비교
    max = Math.max(max, Math.abs(n[0]));
  }

  // 최대값 return
  return max;
}

console.log(solution("100-200*300-500+20")); // 60420
console.log(solution("50*6-3*2")); // 300
