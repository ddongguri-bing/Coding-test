function solution(n, results) {
  const win = Array.from({ length: n + 1 }, () => []);
  const lose = Array.from({ length: n + 1 }, () => []);

  for (const [winner, loser] of results) {
    win[winner].push(loser);
    lose[loser].push(winner);
  }

  const bfs = (start, graph) => {
    const visited = Array(n + 1).fill(false);
    const queue = [start];

    visited[start] = true;
    let count = 0;

    while (queue.length) {
      const current = queue.shift();

      for (const next of graph[current]) {
        if (!visited[next]) {
          visited[next] = true;
          queue.push(next);
          count++;
        }
      }
    }

    return count;
  };

  let answer = 0;

  for (let i = 0; i <= n; i++) {
    const winCount = bfs(i, win);
    const loseCount = bfs(i, lose);

    console.log(winCount, loseCount);

    if (winCount + loseCount === n - 1) answer++;
  }

  return answer;
}

console.log(
  solution(5, [
    [4, 3],
    [4, 2],
    [3, 2],
    [1, 2],
    [2, 5],
  ]),
); // 2
