const solution = (decimal) => {
  let stack = [];

  while (decimal > 0) {
    // 나머지를 stack에 추가
    const remainder = decimal % 2;
    stack.push(remainder);

    // 몫은 다시 decimal 변수에 재할당
    decimal = Math.floor(decimal / 2);
  }

  // stack 특성상 반대로 빼내며 읽어내야 하지만, 배열 메서드인 reverse를 사용하여 stack의 pop과 같이 동작하도록 함
  // 그리고 join 메서드를 활용하여 문자열로 변환
  return stack.reverse().join("");
};

console.log(solution(10)); // 1010
console.log(solution(27)); // 11011
console.log(solution(12345)); // 11000000111001
