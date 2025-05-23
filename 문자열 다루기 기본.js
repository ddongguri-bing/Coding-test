// 문제 설명
// 문자열 s의 길이가 4 혹은 6이고, 숫자로만 구성돼있는지 확인해주는 함수, solution을 완성하세요.
// 예를 들어 s가 "a234"이면 False를 리턴하고 "1234"라면 True를 리턴하면 됩니다.

// 제한 사항
// s는 길이 1 이상, 길이 8 이하인 문자열입니다.
// s는 영문 알파벳 대소문자 또는 0부터 9까지 숫자로 이루어져 있습니다.

function solution(s) {
  // 문자열이 4나 6이 아니라면 바로 false를 반환
  if (s.length !== 4 && s.length !== 6) return false;

  // 정규식을 사용하여 문자열 s 전체가 숫자인지 검증
  // ^ : 문자열의 시작
  // [0-9] : 숫자(0-9)
  // + : 한 번 이상 반복
  // $ : 문자열 끝
  return /^[0-9]+$/.test(s);
}

console.log(solution("a234")); // false
console.log(solution("1234")); // true
