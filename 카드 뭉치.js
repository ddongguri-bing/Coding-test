// 문제 설명
// 코니는 영어 단어가 적힌 카드 뭉치 두 개를 선물로 받았습니다.
// 코니는 다음과 같은 규칙으로 카드에 적힌 단어들을 사용해 원하는 순서의 단어 배열을 만들 수 있는지 알고 싶습니다.

// 원하는 카드 뭉치에서 카드를 순서대로 한 장씩 사용합니다.
// 한 번 사용한 카드는 다시 사용할 수 없습니다.
// 카드를 사용하지 않고 다음 카드로 넘어갈 수 없습니다.
// 기존에 주어진 카드 뭉치의 단어 순서는 바꿀 수 없습니다.
// 예를 들어 첫 번째 카드 뭉치에 순서대로 ["i", "drink", "water"],
// 두 번째 카드 뭉치에 순서대로 ["want", "to"]가 적혀있을 때 ["i", "want", "to", "drink", "water"] 순서의 단어 배열을 만들려고 한다면
// 첫 번째 카드 뭉치에서 "i"를 사용한 후 두 번째 카드 뭉치에서 "want"와 "to"를 사용하고
// 첫 번째 카드뭉치에 "drink"와 "water"를 차례대로 사용하면 원하는 순서의 단어 배열을 만들 수 있습니다.

// 문자열로 이루어진 배열 cards1, cards2와 원하는 단어 배열 goal이 매개변수로 주어질 때,
// cards1과 cards2에 적힌 단어들로 goal를 만들 있다면 "Yes"를, 만들 수 없다면 "No"를 return하는 solution 함수를 완성해주세요.

// 제한사항
// 1 ≤ cards1의 길이, cards2의 길이 ≤ 10
// 1 ≤ cards1[i]의 길이, cards2[i]의 길이 ≤ 10
// cards1과 cards2에는 서로 다른 단어만 존재합니다.
// 2 ≤ goal의 길이 ≤ cards1의 길이 + cards2의 길이
// 1 ≤ goal[i]의 길이 ≤ 10
// goal의 원소는 cards1과 cards2의 원소들로만 이루어져 있습니다.
// cards1, cards2, goal의 문자열들은 모두 알파벳 소문자로만 이루어져 있습니다.

// function solution(cards1, cards2, goal) {
//   let answer = 'Yes';

//   for (let i = 0; i < goal.length; i++) {
//     if (goal[i] === cards1[0]) {
//       cards1.shift();
//       continue;
//     }

//     if (goal[i] === cards2[0]) {
//       cards2.shift();
//       continue;
//     }

//     answer = 'No';
//   }

//   return answer;
// }

// function solution(cards1, cards2, goal) {
//   let answer = 'Yes';

//   for (let i = 0; i < goal.length; i++) {
//     if (goal[i] === cards1[0] || cards2[0]) {
//       if (goal[i] === cards1[0]) cards1.shift();
//       else cards2.shift();
//       console.log(`cards1 : ${cards1} // cards2: ${cards2}`);
//     } else answer = 'No';
//   }

//   return answer;
// }

// 위 코드에서 if (goal[i] === cards1[0] || cards2[0])는 앞의 조건이 false라면 뒤의 조건은 존재 자체만으로 true로 평가
// 따라서 아래와 같이 조건을 제대로 비교해주면 해결 !

function solution(cards1, cards2, goal) {
  let answer = 'Yes';

  for (let i = 0; i < goal.length; i++) {
    if (goal[i] === cards1[0] || goal[i] === cards2[0]) {
      if (goal[i] === cards1[0]) cards1.shift();
      else cards2.shift();
      console.log(`cards1 : ${cards1} // cards2: ${cards2}`);
    } else answer = 'No';
  }

  return answer;
}

console.log(
  solution(
    ['i', 'drink', 'water'],
    ['want', 'to'],
    ['i', 'want', 'to', 'drink', 'water']
  )
); // "Yes"

console.log(
  solution(
    ['i', 'water', 'drink'],
    ['want', 'to'],
    ['i', 'want', 'to', 'drink', 'water']
  )
); // "No"

console.log(
  solution(
    ['i', 'water', 'drink'],
    ['i', 'to'],
    ['i', 'want', 'to', 'drink', 'water']
  )
); // "No"
