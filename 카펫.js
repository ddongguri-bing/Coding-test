// Leo는 카펫을 사러 갔다가 아래 그림과 같이 중앙에는 노란색으로 칠해져 있고 테두리 1줄은 갈색으로 칠해져 있는 격자 모양 카펫을 봤습니다.
// Leo는 집으로 돌아와서 아까 본 카펫의 노란색과 갈색으로 색칠된 격자의 개수는 기억했지만, 전체 카펫의 크기는 기억하지 못했습니다.

// Leo가 본 카펫에서 갈색 격자의 수 brown, 노란색 격자의 수 yellow가 매개변수로 주어질 때
// 카펫의 가로, 세로 크기를 순서대로 배열에 담아 return 하도록 solution 함수를 작성해주세요.

// 제한사항
// 갈색 격자의 수 brown은 8 이상 5,000 이하인 자연수입니다.
// 노란색 격자의 수 yellow는 1 이상 2,000,000 이하인 자연수입니다.
// 카펫의 가로 길이는 세로 길이와 같거나, 세로 길이보다 깁니다.

// 약수 구하는 함수
function findDivisors(number) {
  const divisors = [];

  for (let i = 1; i <= Math.sqrt(number); i++) {
    if (number % i === 0) {
      divisors.push(i);
      if (number / i !== i) divisors.push(number / i);
    }
  }

  return divisors.sort((x, y) => y - x);
}

// 함수 예시
// i = 1 -> 12 % 1 === 0 divisors.push(1) && 12 / 1 !== 1 divisors.push(12)
// i = 2 -> 12 % 2 === 0 divisors.push(2) && 12 / 2 !== 2 divisors.push(6)
// i = 3 -> 12 % 3 === 0 divisors.push(3) && 12 / 3 !== 3 divisors.push(4)

function solution(brown, yellow) {
  // 전체 격자 수(total)는 brown + yellow
  const total = brown + yellow;
  // 'width * height = total'이므로 width와 height는 total의 약수
  const divisors = findDivisors(total);

  // 구한 약수를 반복
  for (let i = 0; i < divisors.length; i++) {
    // 제일 첫 요소부터 width로 설정
    const width = divisors[i];
    const height = total / width;

    // 조건에 따라 width가 height와 같거나 클 때
    if (width >= height) {
      // yellow가 테두리(양쪽 1씩 총 2)를 제외한 너비와 높이의 곱과 같다면
      if (yellow === (width - 2) * (height - 2)) {
        // 해당 너비와 높이를 return
        return [width, height];
      }
    }
  }
}

console.log(solution(10, 2)); // [4, 3]
console.log(solution(8, 1)); // [3, 3]
console.log(solution(24, 24)); // [8, 6]
