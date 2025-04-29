function solution(s) {
  const n = s.length;
  let answer = 0;

  // i는 stack 시작점, j는 배열 순환
  for (let i = 0; i < s.length; i++) {
    const stack = [];
    let isCorrect = true;

    for (let j = 0; j < n; j++) {
      const c = s[(i + j) % n];

      // 문자가 열린 괄호라면 스택에 push
      if (c === "(" || c === "[" || c === "{") {
        stack.push(c);
      } else {
        // 문자가 닫힌 괄호일 때, 스택의 길이가 0이라면 바로 isCorrect를 false로 변경
        if (stack.length === 0) {
          isCorrect = false;
          break;
        }

        // 문자가 닫힌 괄호일 때 stack의 마지막 열린 괄호와 문자 비교
        const top = stack[stack.length - 1];
        if (c === "]" && top === "[") {
          stack.pop();
        } else if (c === ")" && top === "(") {
          stack.pop();
        } else if (c === "}" && top === "{") {
          stack.pop();
        } else {
          isCorrect = false;
          break;
        }
      }
    }

    // 만약 isCorrect가 true이고 stack이 전부 비었을 때 answer에 1을 더한다
    if (isCorrect && stack.length === 0) {
      answer += 1;
    }
  }

  // 매개변수로 주어진 s를 x만큼 전부 회전하며 비교가 끝나면 answer를 return
  return answer;
}
