function solution(N, stages) {
  const all_stages = Array(N + 2).fill(0);
  let all_players = stages.length;

  for (let i = 0; i < stages.length; i++) {
    all_stages[stages[i]] += 1;
  }

  const failure = [];

  for (let i = 1; i <= N; i++) {
    // 기존 코드
    // failure[i] = [i, all_stages[i] / all_players || 0];
    // 위와 같이 코드를 작성하면 출력 결과가 아래와 같다
    // [ 3, 4, 2, 1, 5, <1 empty item> ]
    // [ 4, 1, 2, 3, <1 empty item> ]
    // 그 이유는 배열은 무조건 0번 index부터 가지기 때문에 failure[0]이 비어버리게 되기 때문이다
    // 따라서 아래와 같이 코드를 수정해서 문제를 해결했다
    failure[i - 1] = [i, all_stages[i] / all_players || 0];
    all_players = all_players - all_stages[i];
  }

  failure.sort((a, b) => b[1] - a[1]);

  return failure.map((e) => +e[0]);
}

console.log(solution(5, [2, 1, 2, 6, 2, 4, 3, 3])); // [3,4,2,1,5]
console.log(solution(4, [4, 4, 4, 4, 4])); // [4,1,2,3]
