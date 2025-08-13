// 문제 설명
// XYZ 마트는 일정한 금액을 지불하면 10일 동안 회원 자격을 부여합니다.
// XYZ 마트에서는 회원을 대상으로 매일 한 가지 제품을 할인하는 행사를 합니다.
// 할인하는 제품은 하루에 하나씩만 구매할 수 있습니다.
// 알뜰한 정현이는 자신이 원하는 제품과 수량이 할인하는 날짜와 10일 연속으로 일치할 경우에 맞춰서 회원가입을 하려 합니다.

// 예를 들어, 정현이가 원하는 제품이 바나나 3개, 사과 2개, 쌀 2개, 돼지고기 2개, 냄비 1개이며,
// XYZ 마트에서 14일간 회원을 대상으로 할인하는 제품이 날짜 순서대로
// 치킨, 사과, 사과, 바나나, 쌀, 사과, 돼지고기, 바나나, 돼지고기, 쌀, 냄비, 바나나, 사과, 바나나인 경우에 대해 알아봅시다.
// 첫째 날부터 열흘 간에는 냄비가 할인하지 않기 때문에 첫째 날에는 회원가입을 하지 않습니다.
// 둘째 날부터 열흘 간에는 바나나를 원하는 만큼 할인구매할 수 없기 때문에 둘째 날에도 회원가입을 하지 않습니다.
// 셋째 날, 넷째 날, 다섯째 날부터 각각 열흘은 원하는 제품과 수량이 일치하기 때문에 셋 중 하루에 회원가입을 하려 합니다.

// 정현이가 원하는 제품을 나타내는 문자열 배열 want와 정현이가 원하는 제품의 수량을 나타내는 정수 배열 number,
// XYZ 마트에서 할인하는 제품을 나타내는 문자열 배열 discount가 주어졌을 때,
// 회원등록시 정현이가 원하는 제품을 모두 할인 받을 수 있는 회원등록 날짜의 총 일수를 return 하는 solution 함수를 완성하시오.
// 가능한 날이 없으면 0을 return 합니다.

function isEqual(obj1, obj2) {
  // Object.keys() 메서드 : 주어진 객체 자체의 열거 가능한 문자열 키를 가진 속성의 이름을 배열로 반환
  const objKeys1 = Object.keys(obj1);
  const objKeys2 = Object.keys(obj2);

  // 만약 두 오브젝트에 등록된 값이 다르다면 false
  if (objKeys1.length !== objKeys2.length) return false;

  for (const key of objKeys1) {
    const value1 = obj1[key];
    const value2 = obj2[key];

    // 키에 해당하는 값이 다르다면 false
    if (value1 !== value2) return false;
  }

  // 모든 값이 일치한다면 true
  return true;
}

function solution(want, number, discount) {
  // 원하는 제품과 수량을 저장할 오브젝트
  let wantObj = {};

  // 오브젝트에 제품을 키로, 수량을 값으로 저장
  for (let i = 0; i < want.length; i++) {
    wantObj[want[i]] = number[i];
  }

  // 할인 받을 수 있는 회원 등록 날짜의 총 일수를 계산할 변수 초기화
  let answer = 0;

  // 특정일 i에 회원가입 시 할인 받을 수 있는 제품 확인
  for (let i = 0; i < discount.length - 9; i++) {
    // i일에 회원가입 시 할인 받는 제품 및 개수를 담을 오브젝트
    const discount10Days = {};

    // i부터 10개의 품목을 discount10Days에 추가
    for (let j = i; j < i + 10; j++) {
      // wantObj에 discount[j]의 값이 있으면 discount10Days 오브젝트에 기본 값을 설정하거나 1을 추가함
      if (wantObj[discount[j]])
        discount10Days[discount[j]] = (discount10Days[discount[j]] || 0) + 1;
    }

    // 위의 과정을 통해 만들어진 discount10Days와 wantObj를 비교하여 return 값이 true라면 answer에 1 추가
    if (isEqual(discount10Days, wantObj)) answer += 1;
  }

  return answer;
}

console.log(
  solution(
    ["banana", "apple", "rice", "pork", "pot"],
    [3, 2, 2, 2, 1],
    [
      "chicken",
      "apple",
      "apple",
      "banana",
      "rice",
      "apple",
      "pork",
      "banana",
      "pork",
      "rice",
      "pot",
      "banana",
      "apple",
      "banana",
    ]
  )
); // 3

console.log(
  solution(
    ["apple"],
    [10],
    [
      "banana",
      "banana",
      "banana",
      "banana",
      "banana",
      "banana",
      "banana",
      "banana",
      "banana",
      "banana",
    ]
  )
); // 0
