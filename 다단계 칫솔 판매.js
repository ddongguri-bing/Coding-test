// 문제 설명
// 민호는 다단계 조직을 이용하여 칫솔을 판매하고 있습니다.
// 판매원이 칫솔을 판매하면 그 이익이 피라미드 조직을 타고 조금씩 분배되는 형태의 판매망입니다.
// 어느정도 판매가 이루어진 후, 조직을 운영하던 민호는 조직 내 누가 얼마만큼의 이득을 가져갔는지가 궁금해졌습니다.
// 예를 들어, 민호가 운영하고 있는 다단계 칫솔 판매 조직이 아래 그림과 같다고 합시다.

// 민호는 center이며, 파란색 네모는 여덟 명의 판매원을 표시한 것입니다.
// 각각은 자신을 조직에 참여시킨 추천인에 연결되어 피라미드 식의 구조를 이루고 있습니다.
// 조직의 이익 분배 규칙은 간단합니다.
// 모든 판매원은 칫솔의 판매에 의하여 발생하는 이익에서 10% 를 계산하여 자신을 조직에 참여시킨 추천인에게 배분하고 나머지는 자신이 가집니다.
// 모든 판매원은 자신이 칫솔 판매에서 발생한 이익 뿐만 아니라, 자신이 조직에 추천하여 가입시킨 판매원에게서 발생하는 이익의 10% 까지 자신에 이익이 됩니다.
// 자신에게 발생하는 이익 또한 마찬가지의 규칙으로 자신의 추천인에게 분배됩니다.
// 단, 10% 를 계산할 때에는 원 단위에서 절사하며, 10%를 계산한 금액이 1 원 미만인 경우에는 이득을 분배하지 않고 자신이 모두 가집니다.
// 각 판매원의 이름을 담은 배열 enroll,
// 각 판매원을 다단계 조직에 참여시킨 다른 판매원의 이름을 담은 배열 referral,
// 판매량 집계 데이터의 판매원 이름을 나열한 배열 seller,
// 판매량 집계 데이터의 판매 수량을 나열한 배열 amount가 매개변수로 주어질 때,
// 각 판매원이 득한 이익금을 나열한 배열을 return 하도록 solution 함수를 완성해주세요.
// 판매원에게 배분된 이익금의 총합을 계산하여(정수형으로), 입력으로 주어진 enroll에 이름이 포함된 순서에 따라 나열하면 됩니다.

function solution(enroll, referral, seller, amount) {
  // enroll과 referral 관계를 저장할 객체
  let parent = {};
  for (let i = 0; i < enroll.length; i++) {
    parent[enroll[i]] = referral[i];
  }

  // 각 판매원이 득한 이익금을 저장할 객체
  let total = {};
  // 각 판매원이 득한 이익금을 0으로 하여 객체 초기화
  for (let name of enroll) {
    total[name] = 0;
  }

  // seller 배열을 순회하면서 total 객체에 득한 이익금 업데이트
  for (let i = 0; i < seller.length; i++) {
    let money = amount[i] * 100;
    let curName = seller[i];

    // 현재 seller로부터 최상위 부모까지 올라가며 이익금 합산
    while (money > 0 && curName != "-") {
      total[curName] += money - Math.floor(money / 10);
      curName = parent[curName];
      money = Math.floor(money / 10);
    }
  }

  // enroll 순서대로 이익금 배열을 출력해야 하므로 map으로 enroll을 순회하며 total 객체의 값을 출력
  return enroll.map((name) => total[name]);
}

console.log(
  solution(
    ["john", "mary", "edward", "sam", "emily", "jaimie", "tod", "young"],
    ["-", "-", "mary", "edward", "mary", "mary", "jaimie", "edward"],
    ["young", "john", "tod", "emily", "mary"],
    [12, 4, 2, 5, 10]
  )
); // [360, 958, 108, 0, 450, 18, 180, 1080]

console.log(
  solution(
    ["john", "mary", "edward", "sam", "emily", "jaimie", "tod", "young"],
    ["-", "-", "mary", "edward", "mary", "mary", "jaimie", "edward"],
    ["sam", "emily", "jaimie", "edward"],
    [2, 3, 5, 4]
  )
); // [0, 110, 378, 180, 270, 450, 0, 0]
