// 문제 설명
// 문자열 s는 한 개 이상의 단어로 구성되어 있습니다.
// 각 단어는 하나 이상의 공백문자로 구분되어 있습니다.
// 각 단어의 짝수번째 알파벳은 대문자로, 홀수번째 알파벳은 소문자로 바꾼 문자열을 리턴하는 함수, solution을 완성하세요.

// 제한 사항
// 문자열 전체의 짝/홀수 인덱스가 아니라, 단어(공백을 기준)별로 짝/홀수 인덱스를 판단해야합니다.
// 첫 번째 글자는 0번째 인덱스로 보아 짝수번째 알파벳으로 처리해야 합니다.

function solution(s) {
  let answer = '';

  const splitString = s.split(' ');
  console.log(splitString);

  splitString.forEach((word, index) => {
    for (let i = 0; i < word.length; i++) {
      if (i % 2 === 0) answer += word[i].toUpperCase();
      else answer += word[i].toLowerCase();
    }

    if (index < splitString.length - 1) {
      answer += ' ';
    }
  });

  return answer;
}

console.log(solution('try  hello world   '));
console.log(solution('  hello javascript   '));

// 조금 더 정석적인 방법
// 사유 : 시간 복잡도 O(n)
// function solution(s) {
//   let isEven = true;
//   let answer = '';

//   for (let i = 0; i < s.length; i++) {
//     let char = s[i];

//     if (char === ' ') {
//       answer += ' ';
//       isEven = true;
//     } else {
//       if (isEven) {
//         answer += char.toUpperCase();
//       } else {
//         answer += char.toLowerCase();
//       }
//       isEven = !isEven;
//     }
//   }

//   return answer;
// }
