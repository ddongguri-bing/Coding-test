function solution(arr1, arr2) {
  const answer = [];

  const rotated_arr2 = [];
  for (let i = 0; i < arr2[0].length; i++) {
    const arr = [];
    for (let j = 0; j < arr2.length; j++) {
      arr.push(arr2[j][i]);
    }
    rotated_arr2.push(arr);
  }

  for (let i = 0; i < arr1.length; i++) {
    const arr = [];
    for (let j = 0; j < rotated_arr2.length; j++) {
      let sum = 0;
      for (let k = 0; k < arr1[0].length; k++) {
        sum += arr1[i][k] * rotated_arr2[j][k];
      }
      arr.push(sum);
    }
    answer.push(arr);
  }

  return answer;
}

console.log(
  solution(
    [
      [1, 4],
      [3, 2],
      [4, 1],
    ],
    [
      [3, 3],
      [3, 3],
    ]
  )
); // [[15, 15], [15, 15], [15, 15]]
console.log(
  solution(
    [
      [2, 3, 2],
      [4, 2, 4],
      [3, 1, 4],
    ],
    [
      [5, 4, 3],
      [2, 4, 1],
      [3, 1, 1],
    ]
  )
); // [[22, 22, 11], [36, 28, 18], [29, 20, 14]]
