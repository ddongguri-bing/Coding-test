// 문제 설명
// 1부터 n까지 번호가 붙어있는 n명의 사람이 영어 끝말잇기를 하고 있습니다. 영어 끝말잇기는 다음과 같은 규칙으로 진행됩니다.

// 1번부터 번호 순서대로 한 사람씩 차례대로 단어를 말합니다.
// 마지막 사람이 단어를 말한 다음에는 다시 1번부터 시작합니다.
// 앞사람이 말한 단어의 마지막 문자로 시작하는 단어를 말해야 합니다.
// 이전에 등장했던 단어는 사용할 수 없습니다.
// 한 글자인 단어는 인정되지 않습니다.
// 다음은 3명이 끝말잇기를 하는 상황을 나타냅니다.

// tank → kick → know → wheel → land → dream → mother → robot → tank

// 위 끝말잇기는 다음과 같이 진행됩니다.

// 1번 사람이 자신의 첫 번째 차례에 tank를 말합니다.
// 2번 사람이 자신의 첫 번째 차례에 kick을 말합니다.
// 3번 사람이 자신의 첫 번째 차례에 know를 말합니다.
// 1번 사람이 자신의 두 번째 차례에 wheel을 말합니다.
// (계속 진행)
// 끝말잇기를 계속 진행해 나가다 보면, 3번 사람이 자신의 세 번째 차례에 말한 tank 라는 단어는 이전에 등장했던 단어이므로 탈락하게 됩니다.

// 사람의 수 n과 사람들이 순서대로 말한 단어 words 가 매개변수로 주어질 때,
// 가장 먼저 탈락하는 사람의 번호와 그 사람이 자신의 몇 번째 차례에 탈락하는지를 구해서 return 하도록 solution 함수를 완성해주세요.

function solution(n, words) {
  // 중복된 단어를 피하기 위해 set 생성
  let wordsSet = new Set();
  // 제일 처음 단어는 무조건 들어가기 때문에 바로 set에 삽입
  wordsSet.add(words[0]);

  // words를 순서대로 순회하면서
  for (let i = 1; i < words.length; i++) {
    if (words[i - 1][words[i - 1].length - 1] !== words[i][0]) {
      // 해당 단어의 첫 글자와 이전 글자의 마지막 단어가 다르다면
      return [(i % n) + 1, Math.ceil((i + 1) / n)];
    } else {
      // 해당 단어의 첫 글자와 이전 글자의 마지막 단어가 다르다면
      if (!wordsSet.has(words[i])) wordsSet.add(words[i]);
      else return [(i % n) + 1, Math.ceil((i + 1) / n)];
    }
  }
  return [0, 0];
}

// 교재 풀이
// 나와는 달리 || 연산자를 사용하여 중복되는 부분을 줄였다 -> 코드가 조금 더 간결해지고 읽기 쉬워지는 듯
function bookSolution(n, words) {
  let usedWords = new Set(); // 이미 사용한 단어를 저장하는 set
  let prevWord = words[0][0]; // 이전 단어의 마지막 글자
  for (let i = 0; i < words.length; i++) {
    let word = words[i];
    // 이미 사용한 단어이거나 첫 글자가 이전 단어와 일치하지 않으면
    if (usedWords.has(word) || word[0] != prevWord)
      return [(i % n) + 1, Math.floor(i / n) + 1];
    usedWords.add(word);
    prevWord = StrictMode.slice(-1); // 이전 단어의 마지막 글자 업데이트
  }
  return [0, 0];
}

console.log(
  solution(3, [
    "tank",
    "kick",
    "know",
    "wheel",
    "land",
    "dream",
    "mother",
    "robot",
    "tank",
  ])
); // [3, 3];
console.log(
  solution(5, [
    "hello",
    "observe",
    "effect",
    "take",
    "either",
    "recognize",
    "encourage",
    "ensure",
    "establish",
    "hang",
    "gather",
    "refer",
    "reference",
    "estimate",
    "executive",
  ])
); // [0,0]
console.log(
  solution(2, ["hello", "one", "even", "never", "now", "world", "draw"])
); // [1,3]
console.log(solution(3, ["abc", "cbd", "ddd", "ddd", "dbc", "cbd"])); //	[1, 2]
