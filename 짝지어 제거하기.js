// 나의 풀이
const solution1 = (s) => {
  // 문자열을 split을 사용해 배열로 변환
  const array = s.split("");
  // 스택 초기화
  let stack = [];

  for (let i = 0; i < array.length; i++) {
    // 스택이 비어있으면 비교를 하지 못하기 때문에 index 0 값은 무조건 스택에 push
    if (i === 0) {
      stack.push(array[0]);
      continue;
    }

    // 스택의 마지막 값과 비교하는 값이 같으면 스택의 요소를 pop
    if (stack[stack.length - 1] === array[i]) {
      stack.pop();
    } else {
      // 같지 않다면 스택에 비교하는 값을 push
      stack.push(array[i]);
    }
  }

  // 스택이 비어있다면 1, 비어있지 않다면 0을 반환
  return stack.length === 0 ? 1 : 0;
};

// 교재의 풀이
// 문자열을 순회하는 for...of 구문과 스택이 비어있는지 확인하는 조건문을 통해 조금 더 깔끔한 코드를 작성할 수 있음
const solution2 = (s) => {
  const stack = [];

  // 문자열을 순회하며 스택과 비교
  for (const c of s) {
    // 스택이 비어있지 않고 스택의 마지막 값과 비교하는 값이 같으면 스택의 요소를 pop
    if (stack.length > 0 && stack[stack.length - 1] === c) {
      stack.pop();
    } else {
      // 같지 않다면 스택에 비교하는 값을 push
      stack.push(c);
    }
  }

  // 스택이 비어있다면 1, 비어있지 않다면 0을 반환
  return stack.length === 0 ? 1 : 0;
};

console.log(solution1("baabaa")); // 1
console.log(solution1("cdcd")); // 0
console.log(solution2("baabaa")); // 1
console.log(solution2("cdcd")); // 0
