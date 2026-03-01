// 문제 제한사항 : n은 2 이상 100,000 이하인 자연수입니다.

function solution(n) {
  // function f(n) {
  //   if (n === 0) return 0;
  //   if (n === 1) return 1;
  //   return f(n - 1) + f(n - 2);
  // }
  // const fibo_answer = f(n);
  // return fibo_answer % 1234567;

  // 위와 같이 풀이하면 시간초과, stack overflow가 발생하기 때문에 메모이제이션을 활용해야 한다

  const fibo_data = [0, 1];

  for (let i = 2; i <= n; i++) {
    fibo_data.push((fibo_data[i - 1] + fibo_data[i - 2]) % 1234567);
  }

  return fibo_data[n];
}

console.log(solution(3)); // 2
console.log(solution(5)); // 5
