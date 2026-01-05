function isPrime(num) {
  if (num <= 1) return false;

  for (let i = 2; i * i <= num; i++) {
    if (num % i === 0) return false;
  }

  return true;
}

function solution(numbers) {
  const splited_numbers = numbers.split("");
  const used_numbers = Array(splited_numbers.length).fill(false);
  const numbers_set = new Set();

  function dfs(current) {
    if (current.length > 0) {
      const num = Number(current);
      if (isPrime(num)) numbers_set.add(num);
    }

    for (let i = 0; i < splited_numbers.length; i++) {
      if (used_numbers[i]) continue;

      used_numbers[i] = true;
      dfs(current + splited_numbers[i]);
      used_numbers[i] = false;
    }
  }

  dfs("");

  return numbers_set.size;
}

console.log(solution("17")); // 3
console.log(solution("011")); // 2
