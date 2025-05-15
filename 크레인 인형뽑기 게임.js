function solution(board, moves) {
  // 각 열에 대한 스택을 생성
  const lanes = [...Array(board[0].length)].map(() => []);

  // board 배열을 뒤에서부터 순환하면서 lanes 스택에 값 추가
  for (let i = board.length - 1; i >= 0; i--) {
    for (let j = 0; j < board[0].length; j++) {
      if (board[i][j]) lanes[j].push(board[i][j]);
    }
  }

  // 인형을 담을 bucket과 없어지는 인형의 총 개수를 저장할 변수 선언 및 초기화
  const bucket = [];
  let answer = 0;

  // moves를 순환하면서 동작 수행
  for (const i of moves) {
    // 만약 해당 lanes에 인형이 들어있다면
    if (lanes[i - 1].length > 0) {
      // 해당 lane의 인형을 꺼냄
      const doll = lanes[i - 1].pop();

      // bucket에 이미 인형이 들어있고, 추출한 인형이 bucket 제일 위의 인형과 같다면
      if (bucket.length > 0 && doll === bucket[bucket.length - 1]) {
        // bucket의 마지막 인형을 없애고 사라진 인형 2개를 answer에 더해줌
        bucket.pop();
        answer += 2;
        // 만약 bucket에 인형이 없거나 추출한 인형과 bucket 제일 위의 인형이 다르다면 추출한 인형을 bucket에 push
      } else bucket.push(doll);
    }
  }

  // 모든 moves를 끝내고 answer를 반환
  return answer;
}

console.log(
  solution(
    [
      [0, 0, 0, 0, 0],
      [0, 0, 1, 0, 3],
      [0, 2, 5, 0, 1],
      [4, 2, 4, 4, 2],
      [3, 5, 1, 3, 1],
    ],
    [1, 5, 3, 5, 1, 2, 1, 4]
  )
); // 4
