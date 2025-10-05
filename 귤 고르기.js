// 문제 설명
// 경화는 과수원에서 귤을 수확했습니다. 경화는 수확한 귤 중 'k'개를 골라 상자 하나에 담아 판매하려고 합니다.
// 그런데 수확한 귤의 크기가 일정하지 않아 보기에 좋지 않다고 생각한 경화는 귤을 크기별로 분류했을 때 서로 다른 종류의 수를 최소화하고 싶습니다.

// 예를 들어, 경화가 수확한 귤 8개의 크기가 [1, 3, 2, 5, 4, 5, 2, 3] 이라고 합시다.
// 경화가 귤 6개를 판매하고 싶다면, 크기가 1, 4인 귤을 제외한 여섯 개의 귤을 상자에 담으면,
// 귤의 크기의 종류가 2, 3, 5로 총 3가지가 되며 이때가 서로 다른 종류가 최소일 때입니다.

// 경화가 한 상자에 담으려는 귤의 개수 k와 귤의 크기를 담은 배열 tangerine이 매개변수로 주어집니다.
// 경화가 귤 k개를 고를 때 크기가 서로 다른 종류의 수의 최솟값을 return 하도록 solution 함수를 작성해주세요.

function solution(k, tangerine) {
  // 귤 종류의 수를 담을 변수 answer
  let answer = 0;

  // 귤 종류와 개수를 담을 객체
  let tangerineObj = {};
  for (let i = 0; i < tangerine.length; i++) {
    tangerineObj[tangerine[i]] = tangerineObj[tangerine[i]] + 1 || 1;
  }

  // 해당 객체를 배열로 변환한 뒤 내림차순 정렬
  let tangerineArray = Object.entries(tangerineObj).sort((a, b) => b[1] - a[1]);

  // 귤 개수를 저장할 sum 변수
  let sum = 0;
  // 내림차순 정렬한 배열을 반복하면서 담아야하는 귤 개수보다 크거나 같아질 때까지 합산 한 뒤 해당 조건이 되면 answer을 return
  for (let i = 0; i < tangerineArray.length; i++) {
    if (sum >= k) return answer;
    // 조건에 해당하지 않으면 sum에 귤 개수를 합산하고 종류 변수에도 +1
    sum += tangerineArray[i][1];
    answer++;
  }

  return answer;
}

console.log(solution(6, [1, 3, 2, 5, 4, 5, 2, 3])); // 3
console.log(solution(4, [1, 3, 2, 5, 4, 5, 2, 3])); // 2
console.log(solution(2, [1, 1, 1, 1, 2, 2, 2, 3])); // 1
