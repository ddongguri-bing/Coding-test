function solution(board, moves) {
  const revised_board = [];

  for (let i = 0; i < board.length; i++) {
    const array = [];
    for (let j = board[0].length - 1; j >= 0; j--) {
      if (board[j][i] === 0) continue;
      array.push(board[j][i]);
    }
    revised_board.push(array);
  }

  const bucket = [];
  let count = 0;

  for (let move of moves) {
    const doll = revised_board[move - 1].pop();

    if (doll) {
      if (bucket.length > 0 && bucket[bucket.length - 1] === doll) {
        bucket.pop();
        count += 2;
      } else bucket.push(doll);
    }
  }

  return count;
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
