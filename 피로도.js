function solution(k, dungeons) {
  const visited_dungeons = Array(dungeons.length).fill(false);
  let max_count = 0;

  function dfs(current, count) {
    max_count = Math.max(max_count, count);

    for (let i = 0; i < dungeons.length; i++) {
      if (!visited_dungeons[i] && current >= dungeons[i][0]) {
        visited_dungeons[i] = true;
        dfs(current - dungeons[i][1], count + 1);
        visited_dungeons[i] = false;
      }
    }
  }

  dfs(k, 0);
  return max_count;
}

console.log(
  solution(80, [
    [80, 20],
    [50, 40],
    [30, 10],
  ])
); // 3
