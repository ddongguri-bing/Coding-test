// 화폐 단위는 1, 10, 50, 100

function solution(amount) {
  let answer = [];
  const currency = [100, 50, 10, 1];

  for (const coin of currency) {
    while (amount >= coin) {
      answer.push(coin);
      amount -= coin;
    }
  }

  return answer;
}

console.log(solution(123)); // [100, 10, 10, 1, 1, 1]
console.log(solution(350)); // [100, 100, 100, 50]
