// 문제 설명
// 레스토랑을 운영하던 스카피는 코로나19로 인한 불경기를 극복하고자 메뉴를 새로 구성하려고 고민하고 있습니다.
// 기존에는 단품으로만 제공하던 메뉴를 조합해서 코스요리 형태로 재구성해서 새로운 메뉴를 제공하기로 결정했습니다.
// 어떤 단품메뉴들을 조합해서 코스요리 메뉴로 구성하면 좋을 지 고민하던 "스카피"는
// 이전에 각 손님들이 주문할 때 가장 많이 함께 주문한 단품메뉴들을 코스요리 메뉴로 구성하기로 했습니다.
// 단, 코스요리 메뉴는 최소 2가지 이상의 단품메뉴로 구성하려고 합니다.
// 또한, 최소 2명 이상의 손님으로부터 주문된 단품메뉴 조합에 대해서만 코스요리 메뉴 후보에 포함하기로 했습니다.

// 예를 들어, 손님 6명이 주문한 단품메뉴들의 조합이 다음과 같다면,
// (각 손님은 단품메뉴를 2개 이상 주문해야 하며, 각 단품메뉴는 A ~ Z의 알파벳 대문자로 표기합니다.)

// [문제]
// 각 손님들이 주문한 단품메뉴들이 문자열 형식으로 담긴 배열 orders,
// "스카피"가 추가하고 싶어하는 코스요리를 구성하는 단품메뉴들의 갯수가 담긴 배열 course가 매개변수로 주어질 때,
// "스카피"가 새로 추가하게 될 코스요리의 메뉴 구성을 문자열 형태로 배열에 담아 return 하도록 solution 함수를 완성해 주세요.

// 조합 구하기
function combinations(arr, n) {
  // 한 개만 뽑는다면 그대로 조합을 반환하며 탈출 조건으로 사용
  if (n === 1) return arr.map((v) => [v]);
  const result = [];

  // 요소를 순환하며 조합 구성
  arr.forEach((fixed, idx, arr) => {
    // 현재 index 이후의 요소를 추출
    const rest = arr.slice(idx + 1);
    // 선택된 요소 이전의 요소를 제외하고 재귀 호출
    const combis = combinations(rest, n - 1);
    // 선택된 요소와 재귀 호출을 통해 구한 조합을 결합
    const combine = combis.map((v) => [fixed, ...v]);
    // 결과 값을 추가
    result.push(...combine);
  });

  return result;
}

function solution(orders, course) {
  let answer = [];

  for (const c of course) {
    let menu = [];
    for (const order of orders) {
      const orderArr = order.split("").sort();
      // combination 함수로 메뉴 구성을 모두 구함
      const comb = combinations(orderArr, c);
      menu.push(...comb);
    }

    // 각 메뉴 구성이 몇 번 주문되었는지 구할 객체 생성
    const counter = {};
    for (const m of menu) {
      const key = m.join("");
      counter[key] = (counter[key] || 0) + 1;
    }
    const max = Math.max(...Object.values(counter));

    // 가장 많이 주문된 구성이 1번 이상 주문된 경우
    if (max > 1) {
      for (const [key, value] of Object.entries(counter)) {
        // 가장 많이 주문된 구성을 찾아서 정답 배열에 추가
        if (value === max) answer.push(key);
      }
    }
  }

  // 오름차순 정렬 후 반환
  return answer.sort();
}

console.log(
  solution(["ABCFG", "AC", "CDE", "ACDE", "BCFG", "ACDEH"], [2, 3, 4])
); // ["AC", "ACDE", "BCFG", "CDE"]
console.log(
  solution(["ABCDE", "AB", "CD", "ADE", "XYZ", "XYZ", "ACD"], [2, 3, 5])
); // ["ACD", "AD", "ADE", "CD", "XYZ"]
console.log(solution(["XYZ", "XWY", "WXA"], [2, 3, 4])); // ["WX", "XY"]
