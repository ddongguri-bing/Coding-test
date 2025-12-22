function solution(n) {
  // 모든 방법의 수를 저장할 변수 count 선언 및 초기화
  let count = 0;

  // 사용한 열과 대각선을 확인할 수 있는 배열 선언 및 초기화
  const used_col = Array(n).fill(false);
  const right_diagonal = Array(2 * n).fill(false); // 좌상우하 row - col + n
  const left_diagonal = Array(2 * n).fill(false); // 우상좌하 row + col

  // dfs - row번째 행에 퀸을 놓을 수 있는 모든 경우를 탐색
  function dfs(row) {
    // 종료 조건 : row === n이면 모든 행에 퀸을 하나씩 배치한 상태가 되어 하나의 답이 되므로 종료
    if (row === n) {
      count++;
      return;
    }

    // 현재 행에서 퀸을 놓을 수 있는 모든 열에 퀸 놓기 시도
    for (let col = 0; col < n; col++) {
      // 대각선 인덱스 계산
      const right_diag = row - col + n;
      const left_diag = row + col;

      // 퀸을 놓을 수 있는지 검사
      // 같은 열에 이미 퀸이 있거나, 같은 좌상우하 대각선에 퀸이 있거나, 같은 우상좌하 대각선에 퀸이 있으면 건너뛰기
      if (
        used_col[col] ||
        right_diagonal[right_diag] ||
        left_diagonal[left_diag]
      )
        continue;

      // 퀸을 배치하고 배치한 곳의 상태를 기록
      used_col[col] = true;
      right_diagonal[right_diag] = true;
      left_diagonal[left_diag] = true;

      // 다음 행으로 이동
      dfs(row + 1);

      // 백트래킹
      used_col[col] = false;
      right_diagonal[right_diag] = false;
      left_diagonal[left_diag] = false;
    }
  }

  dfs(0);
  return count;
}

console.log(solution(4)); // 2
console.log(solution(8)); // 92
