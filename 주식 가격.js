function solution(prices) {
  const n = prices.length;
  // 가격이 떨이지지 않는 기간의 배열(prices 배열의 길이만큼 초기화)
  const answer = new Array(n).fill(0);

  // index를 저장할 stack 초기화
  // const stack = []; stack.push(0);으로 작성할 수 있지만 코드 길이를 줄이기 위해 선언과 동시에 0 추가
  const stack = [0];

  // stack을 사용하여 prices 배열을 순환하면서 현재 가격과 이전 가격을 비교
  for (let i = 1; i < n; i++) {
    // stack의 길이가 0보다 길고 현재 가격이 stack에 최근 push한 prices의 인덱스, 즉 직전 가격보다 작은 경우 while문 수행
    while (stack.length > 0 && prices[i] < prices[stack[stack.length - 1]]) {
      // stack의 마지막 인덱스를 추출
      const j = stack.pop();
      // 추출한 인덱스의 위치에 현재 순환하고 있는 i의 값에서 직전 인덱스인 j를 뺀 값을 추가
      answer[j] = i - j;
    }
    stack.push(i);
  }

  // 모든 과정이 끝났을 때 stack이 비어있지 않다면, stack에 끝까지 남은 인덱스에 해당하는 가격들은 끝까지 가격이 떨어지지 않은 가격
  while (stack.length > 0) {
    // stack의 마지막 인덱스를 꺼내어
    const j = stack.pop();
    // 해당 인덱스 자리에 떨어지지 않은 기간을 계산하여 넣음
    answer[j] = n - 1 - j;
  }

  return answer;
}

console.log(solution([1, 2, 3, 2, 3])); // [4, 3, 1, 1, 0]
