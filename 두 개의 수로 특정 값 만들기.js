// 나의 풀이

function solution1(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] + arr[j] === target) return true;
    }
  }

  return false;
}

console.log(solution1([1, 2, 3, 4, 8], 6)); // True
console.log(solution1([2, 3, 5, 9], 10)); // False

// 해시를 활용한 풀이

function countSort(arr, k) {
  const hashtable = new Array(k + 1).fill(0);

  for (const num of arr) {
    if (num <= k) hashtable[num] = 1;
  }

  return hashtable;
}

function solution2(arr, target) {
  const hashtable = countSort(arr, target);

  for (const num of arr) {
    const complement = target - num;
    if (
      complement !== num &&
      complement >= 0 &&
      complement <= target &&
      hashtable[complement] === 1
    )
      return true;
  }

  return false;
}

console.log(solution2([1, 2, 3, 4, 8], 6)); // True
console.log(solution2([2, 3, 5, 9], 10)); // False
