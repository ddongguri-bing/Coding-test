function solution(wallpaper) {
  const X = [];
  const Y = [];

  for (let i = 0; i < wallpaper.length; i++) {
    for (let j = 0; j < wallpaper[i].length; j++) {
      if (wallpaper[i][j] === '#') {
        X.push(j);
        Y.push(i);
      }
    }
  }

  X.sort((a, b) => a - b);
  Y.sort((a, b) => a - b);

  return [Y[0], X[0], Y[Y.length - 1] + 1, X[X.length - 1] + 1];
}

console.log(solution(['.#...', '..#..', '...#.'])); // [0,1,3,4]

console.log(
  solution([
    '..........',
    '.....#....',
    '......##..',
    '...##.....',
    '....#.....',
  ])
);
// [1,3,5,8]

console.log(
  solution([
    '.##...##.',
    '#..#.#..#',
    '#...#...#',
    '.#.....#.',
    '..#...#..',
    '...#.#...',
    '....#....',
  ])
);
// [0,0,7,9]

console.log(solution(['..', '#.'])); // [1,0,2,1]
